import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { UserSession } from "@src/modules/auth/entities/user-session.entity";
import { AccessTokenPayload } from "@src/modules/auth/types/access-token-payload";
import { RequestingUser } from "@src/modules/auth/types/requesting-user";
import { extractBearerToken } from "@src/utils/extract-bearer-token";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  "access-token",
) {
  public constructor(
    @InjectRepository(UserSession)
    private sessionsRepository: Repository<UserSession>,
    public configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_ACCESS_TOKEN_SECRET"),
      passReqToCallback: true,
    });
  }

  public async validate(
    request: Request,
    payload: AccessTokenPayload,
  ): Promise<RequestingUser> {
    // Extract the access token from the request.
    const accessToken = extractBearerToken(request);

    // Find the session based on the access token.
    const session = await this.sessionsRepository.findOne({
      where: { accessToken },
      relations: {
        user: {
          authorizations: { role: { permissions: true } },
        },
      },
    });

    if (!session) throw new UnauthorizedException("Session not found");

    return {
      id: payload.userId,
      tokens: { accessToken },
      entity: session.user,
    };
  }
}
