import { EntityWithDates } from "@src/modules/common/entities/with-dates.entity";
import { MonitoringAgenda } from "@src/modules/monitoring/entities/monitoring-agenda.entity";
import { User } from "@src/modules/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "monitoring_schedules" })
export class MonitoringSchedule extends EntityWithDates {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id!: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User, (user) => user.schedules)
  public user!: User;

  @JoinColumn({ name: "agenda_id" })
  @ManyToOne(() => MonitoringAgenda, (agenda) => agenda.schedules)
  public agenda!: MonitoringAgenda;
}
