import { ForbiddenError } from "@casl/ability";
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Action } from "@src/modules/auth/authorization/actions";
import { FindAllSessionsDto } from "@src/modules/auth/dto/sessions/find-all-sessions.dto";
import { UserSession } from "@src/modules/auth/entities/user-session.entity";
import { AbilityService } from "@src/modules/auth/services/ability.service";
import { AuthService } from "@src/modules/auth/services/auth.service";
import { AuthTokens } from "@src/modules/auth/types/auth-tokens";
import { PAGINATION_LIMIT } from "@src/modules/common/constants/pagination";
import {
  AuthorizationHeaderMissingError,
  extractBearerToken,
} from "@src/utils/extract-bearer-token";
import { Request } from "express";
import { Repository } from "typeorm";

@Injectable()
export class SessionsService {
  public constructor(
    @Inject(REQUEST)
    private request: Request,
    @InjectRepository(UserSession)
    private userSessionsRepository: Repository<UserSession>,
    private abilityService: AbilityService,
    private authService: AuthService,
  ) {}

  /**
   * Retrieves all user sessions based on the provided criteria.
   *
   * @param findAllSessionsDto - The DTO containing the criteria for finding sessions.
   * @returns A promise that resolves to an array of UserSession objects.
   */
  public async findAll(
    findAllSessionsDto: FindAllSessionsDto,
  ): Promise<UserSession[]> {
    // Find all sessions
    const sessions = await this.userSessionsRepository.find({
      where: { user: { id: findAllSessionsDto.userId } },
      take: findAllSessionsDto.limit ?? PAGINATION_LIMIT,
      skip: findAllSessionsDto.offset,
      relations: { user: true },
    });

    // Check if the requesting user has the permission to read the sessions
    const requestingUser = this.request.user!.entity;
    const userAbility = this.abilityService.grantAbility(requestingUser, {
      user: requestingUser,
    });

    sessions.forEach((session) => {
      return ForbiddenError.from(userAbility).throwUnlessCan(
        Action.READ,
        session,
      );
    });

    return sessions;
  }

  /**
   * Finds a user session by session ID.
   *
   * @param sessionId - The ID of the session to find.
   * @returns A promise that resolves to the found UserSession object.
   * @throws BadRequestException if the session is not found.
   */
  public async findOne(sessionId: string): Promise<UserSession> {
    // Find the session
    const session = await this.userSessionsRepository.findOne({
      where: { id: sessionId },
      relations: { user: true },
    });

    // Check if the requesting user has the permission to read the session
    if (session) {
      const requestingUser = this.request.user!.entity;
      const userAbility = this.abilityService.grantAbility(requestingUser, {
        user: requestingUser,
      });
      ForbiddenError.from(userAbility).throwUnlessCan(Action.READ, session);
    }

    if (!session) throw new BadRequestException("Session not found");

    return session;
  }

  /**
   * Refreshes the session by generating new authentication tokens and updating the session with the new tokens.
   *
   * Throws a NotFoundException if the session to refresh is not found.
   * Throws a ForbiddenError if the requesting user does not have the permission to refresh the session.
   * @returns An object containing the new access token and refresh token.
   */
  public async refresh(): Promise<AuthTokens> {
    // Find the session to refresh
    const sessionToRefresh = await this.userSessionsRepository.findOne({
      where: { refreshToken: this.request.user!.tokens.refreshToken },
      relations: { user: true },
    });

    if (!sessionToRefresh) throw new NotFoundException("Session not found");

    // Check if the requesting user has the permission to refresh the session
    const requestingUser = this.request.user!.entity;
    const userAbility = this.abilityService.grantAbility(requestingUser, {
      user: requestingUser,
    });

    ForbiddenError.from(userAbility).throwUnlessCan(
      Action.REFRESH,
      sessionToRefresh,
    );

    // Generate new auth tokens
    const { accessToken, refreshToken } =
      await this.authService.generateAuthTokens(requestingUser);

    // Update the session with the new tokens
    const sessionToSave = this.userSessionsRepository.merge(sessionToRefresh, {
      accessToken,
      refreshToken,
      accessTokenExpiredAt: this.authService.geExpiredAtFromToken(accessToken),
      refreshTokenExpiredAt:
        this.authService.geExpiredAtFromToken(refreshToken),
    });

    await this.userSessionsRepository.save(sessionToSave);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Logs out the user by deleting the session.
   *
   * @returns A Promise that resolves to void.
   * @throws BadRequestException If the session is not found.
   */
  public async logout(): Promise<void> {
    try {
      // Find the session to logout
      const accessToken = extractBearerToken(this.request);

      const session = await this.userSessionsRepository.findOne({
        where: { accessToken },
        relations: { user: true },
      });

      if (!session) throw new BadRequestException("Session not found");

      // Check if the requesting user has the permission to delete the session
      const requestingUser = this.request.user!.entity;
      const userAbility = this.abilityService.grantAbility(requestingUser, {
        user: requestingUser,
      });

      ForbiddenError.from(userAbility).throwUnlessCan(Action.DELETE, session);

      // Soft remove the session
      await this.userSessionsRepository.softRemove(session);
    } catch (error) {
      if (error instanceof AuthorizationHeaderMissingError) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }
  }

  /**
   * Removes a session by session ID.
   *
   * @param sessionId - The ID of the session to remove.
   * @throws BadRequestException if the session is not found.
   * @returns A Promise that resolves when the session is successfully removed.
   */
  public async remove(sessionId: string): Promise<void> {
    // Find the session to remove
    const session = await this.userSessionsRepository.findOne({
      where: { id: sessionId },
      relations: { user: true },
    });

    if (!session) throw new BadRequestException("Session not found");

    // Check if the requesting user has the permission to delete the session
    const requestingUser = this.request.user!.entity;
    const userAbility = this.abilityService.grantAbility(requestingUser, {
      user: requestingUser,
    });

    ForbiddenError.from(userAbility).throwUnlessCan(Action.DELETE, session);

    // Soft remove the session
    await this.userSessionsRepository.softRemove(session);
  }
}
