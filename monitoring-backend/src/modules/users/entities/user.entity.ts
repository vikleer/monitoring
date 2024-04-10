import { UserAuthorization } from "@src/modules/auth/entities/user-authorization.entity";
import { UserSession } from "@src/modules/auth/entities/user-session.entity";
import { EntityWithDates } from "@src/modules/common/entities/with-dates.entity";
import { MonitoringSchedule } from "@src/modules/monitoring/entities/monitoring-schedule.entity";
import { Monitoring } from "@src/modules/monitoring/entities/monitoring.entity";
import { UserProfile } from "@src/modules/users/entities/user-profile.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "users" })
export class User extends EntityWithDates {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id!: string;

  @Column({ name: "email", unique: true, type: "varchar" })
  public email!: string;

  @Column({ name: "password", type: "varchar" })
  public password!: string;

  @JoinColumn({ name: "profile_id" })
  @OneToOne(() => UserProfile, { nullable: true })
  public profile!: UserProfile;

  @OneToMany(() => UserSession, (session) => session.user)
  public sessions!: UserSession[];

  @OneToMany(() => UserAuthorization, (authorization) => authorization.user)
  public authorizations!: UserAuthorization[];

  @OneToMany(() => Monitoring, (monitoring) => monitoring.createdBy)
  public monitoring!: Monitoring[];

  @OneToMany(() => MonitoringSchedule, (agenda) => agenda.user)
  public schedules!: MonitoringSchedule[];
}
