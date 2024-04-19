import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { REQUEST } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { SignInDto } from "@src/modules/auth/dto/auth/sign-in.dto";
import { UserAuthorization } from "@src/modules/auth/entities/user-authorization.entity";
import { UserRole } from "@src/modules/auth/entities/user-role.entity";
import { UserSession } from "@src/modules/auth/entities/user-session.entity";
import { AccessTokenPayload } from "@src/modules/auth/types/access-token-payload";
import { AuthTokens } from "@src/modules/auth/types/auth-tokens";
import { BasePayload } from "@src/modules/auth/types/base-payload";
import { RefreshTokenPayload } from "@src/modules/auth/types/refresh-token-payload";
import { CreateUserDto } from "@src/modules/users/dto/create-user.dto";
import { UserProfile } from "@src/modules/users/entities/user-profile.entity";
import { User } from "@src/modules/users/entities/user.entity";
import { hash, verify } from "argon2";
import { Request } from "express";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  public constructor(
    @Inject(REQUEST)
    private request: Request,
    @InjectRepository(UserSession)
    private userSessionsRepository: Repository<UserSession>,
    @InjectRepository(UserProfile)
    private usersProfileRepository: Repository<UserProfile>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserRole)
    private userRolesRepository: Repository<UserRole>,
    @InjectRepository(UserAuthorization)
    private userAuthorizationsRepository: Repository<UserAuthorization>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  /**
   * Signs in a user with the provided credentials and returns the generated authentication tokens.
   *
   * @param signInDto - The sign-in data transfer object containing the user's email and password.
   * @returns A promise that resolves to an object containing the access token and refresh token.
   * @throws `BadRequestException` if the email or password are incorrect.
   */
  public async signIn(signInDto: SignInDto): Promise<AuthTokens> {
    // Find user by email
    const user = await this.usersRepository.findOne({
      where: { email: signInDto.email },
    });

    if (!user)
      throw new BadRequestException(
        "El correo o la contraseña son incorrectos.",
      );

    // Check if password matches
    const passwordMatches = await verify(user.password, signInDto.password);

    if (!passwordMatches) {
      throw new BadRequestException(
        "El correo o la contraseña son incorrectos.",
      );
    }

    // Generate auth tokens
    const { accessToken, refreshToken } = await this.generateAuthTokens(user);

    // Save user session
    this.userSessionsRepository.save({
      user,
      accessToken,
      refreshToken,
      accessTokenExpiredAt: this.geExpiredAtFromToken(accessToken),
      refreshTokenExpiredAt: this.geExpiredAtFromToken(refreshToken),
      ipAddress: this.request.ip,
      userAgent: this.request.headers["user-agent"],
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Creates a new user account with the provided sign up data.
   *
   * @param signUpDto - The sign up data for the new user.
   * @throws ConflictException If a user with the same email already exists.
   * @returns A promise that resolves when the user account is successfully created.
   */
  public async signUp(signUpDto: CreateUserDto): Promise<void> {
    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({
      where: { email: signUpDto.email },
      withDeleted: true,
    });

    if (existingUser) throw new ConflictException("User already exists");

    // Hash password
    const passwordHash = await hash(signUpDto.password);

    // Create user profile
    const profile = this.usersProfileRepository.create(signUpDto.profile);
    await this.usersProfileRepository.save(profile);

    // Create user
    const user = await this.usersRepository.save({
      email: signUpDto.email,
      password: passwordHash,
      profile,
    });

    // Assign user roles
    const roles = await this.userRolesRepository
      .createQueryBuilder("role")
      .where("role.name = :user", { user: "User" })
      .orWhere("role.name = :monitor", { monitor: "Monitor" })
      .getMany();

    await this.userAuthorizationsRepository.save(
      roles.map((role) => ({
        user: user,
        role,
      })),
    );
  }

  /**
   * Generates authentication tokens for a given user.
   *
   * @param user - The user for whom the tokens are generated.
   * @returns A promise that resolves to an object containing the access token and refresh token.
   */
  public async generateAuthTokens(user: User): Promise<AuthTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]);

    return { accessToken, refreshToken };
  }

  /**
   * Generates an access token for the given user.
   *
   * @param user - The user object for which the access token is generated.
   * @returns A promise that resolves to the generated access token.
   */
  public async generateAccessToken(user: User): Promise<string> {
    const payload: AccessTokenPayload = { user: { id: user.id } };

    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get("JWT_ACCESS_TOKEN_SECRET"),
      expiresIn: this.configService.get("JWT_ACCESS_TOKEN_EXPIRATION"),
    });
  }

  /**
   * Generates a refresh token for the given user.
   *
   * @param user - The user for whom the refresh token is generated.
   * @returns A promise that resolves to the generated refresh token.
   */
  public async generateRefreshToken(user: User): Promise<string> {
    const payload: RefreshTokenPayload = { user: { id: user.id } };

    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get("JWT_REFRESH_TOKEN_SECRET"),
      expiresIn: this.configService.get("JWT_REFRESH_TOKEN_EXPIRATION"),
    });
  }

  /**
   * Retrieves the expiration date from a JWT token.
   *
   * @param token - The JWT token.
   * @returns The expiration date extracted from the token.
   */
  public geExpiredAtFromToken(token: string): Date {
    const tokenPayload = this.jwtService.decode<BasePayload>(token);

    return new Date(tokenPayload.exp! * 1000);
  }
}
