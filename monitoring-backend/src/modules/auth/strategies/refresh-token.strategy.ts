import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { UserSession } from "@src/modules/auth/entities/user-session.entity";
import { RefreshTokenPayload } from "@src/modules/auth/types/refresh-token-payload";
import { RequestingUser } from "@src/modules/auth/types/requesting-user";
import { extractBearerToken } from "@src/utils/extract-bearer-token";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "refresh-token",
) {
  public constructor(
    @InjectRepository(UserSession)
    private sessionsRepository: Repository<UserSession>,
    public configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_REFRESH_TOKEN_SECRET"),
      passReqToCallback: true,
    });
  }

  public async validate(
    request: Request,
    payload: RefreshTokenPayload,
  ): Promise<RequestingUser> {
    // Extract the refresh token from the request.
    const refreshToken = extractBearerToken(request);

    // Find the session based on the refresh token.
    const session = await this.sessionsRepository.findOne({
      where: { refreshToken },
      relations: {
        user: {
          authorizations: { role: { permissions: true } },
        },
      },
    });

    if (!session) throw new UnauthorizedException("Session not found");

    return {
      id: payload.userId,
      tokens: { refreshToken },
      entity: session.user,
    };
  }
}
