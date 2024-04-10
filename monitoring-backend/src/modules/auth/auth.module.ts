import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "@src/modules/auth/controllers/auth.controller";
import { SessionsController } from "@src/modules/auth/controllers/sessions.controller";
import { UserAuthorization } from "@src/modules/auth/entities/user-authorization.entity";
import { UserPermission } from "@src/modules/auth/entities/user-permission.entity";
import { UserRole } from "@src/modules/auth/entities/user-role.entity";
import { UserSession } from "@src/modules/auth/entities/user-session.entity";
import { AbilityService } from "@src/modules/auth/services/ability.service";
import { AuthTaskService } from "@src/modules/auth/services/auth-task.service";
import { AuthService } from "@src/modules/auth/services/auth.service";
import { SessionsService } from "@src/modules/auth/services/sessions.service";
import { AccessTokenStrategy } from "@src/modules/auth/strategies/access-token.strategy";
import { RefreshTokenStrategy } from "@src/modules/auth/strategies/refresh-token.strategy";
import { UserProfile } from "@src/modules/users/entities/user-profile.entity";
import { User } from "@src/modules/users/entities/user.entity";

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([
      User,
      UserProfile,
      UserSession,
      UserRole,
      UserPermission,
      UserAuthorization,
    ]),
  ],
  controllers: [AuthController, SessionsController],
  providers: [
    AuthService,
    AuthTaskService,
    AbilityService,
    SessionsService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthService, AbilityService, SessionsService],
})
export class AuthModule {}
