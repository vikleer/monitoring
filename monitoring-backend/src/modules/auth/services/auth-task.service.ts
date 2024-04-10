import { UserSession } from "@src/modules/auth/entities/user-session.entity";
import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthTaskService {
  public constructor(
    @InjectRepository(UserSession)
    private sessionsRepository: Repository<UserSession>,
  ) {}

  @Cron(CronExpression.EVERY_WEEK)
  /**
   * Cleans up expired sessions by deleting them from the database.
   * Sessions with a refresh token expiration time earlier than the current time will be deleted.
   */
  public async cleanExpiredSessions(): Promise<void> {
    this.sessionsRepository
      .createQueryBuilder()
      .softDelete()
      .where("refreshTokenExpiresAt < NOW()")
      .execute();
  }
}
