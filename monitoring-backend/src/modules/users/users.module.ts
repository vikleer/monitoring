import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "@src/modules/auth/auth.module";
import { UserSession } from "@src/modules/auth/entities/user-session.entity";
import { Degree } from "@src/modules/degrees/entities/degree.entity";
import { UserProfile } from "@src/modules/users/entities/user-profile.entity";
import { User } from "@src/modules/users/entities/user.entity";
import { UsersController } from "@src/modules/users/users.controller";
import { UsersService } from "@src/modules/users/users.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile, UserSession, Degree]),
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
