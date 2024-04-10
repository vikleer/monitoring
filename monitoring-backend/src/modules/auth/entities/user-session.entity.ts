import { EntityWithDates } from "@src/modules/common/entities/with-dates.entity";
import { User } from "@src/modules/users/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "user_sessions" })
export class UserSession extends EntityWithDates {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id!: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User, (user) => user.sessions)
  public user!: User;

  @Column({
    name: "access_token",
    type: "varchar",
  })
  public accessToken!: string;

  @Column({
    name: "refresh_token",
    type: "varchar",
  })
  public refreshToken!: string;

  @Column({ name: "access_token_expired_at", type: "timestamptz" })
  public accessTokenExpiredAt!: Date;

  @Column({ name: "refresh_token_expired_at", type: "timestamptz" })
  public refreshTokenExpiredAt!: Date;

  @Column({ name: "ip_address", type: "varchar", nullable: true })
  public ipAddress?: string;

  @Column({
    name: "user_agent",
    type: "varchar",
    nullable: true,
    default: null,
  })
  public userAgent?: string | null;
}
