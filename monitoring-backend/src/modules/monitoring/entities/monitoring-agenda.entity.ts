import { MonitoringSchedule } from "@src/modules/monitoring/entities/monitoring-schedule.entity";
import { EntityWithDates } from "@src/modules/common/entities/with-dates.entity";
import { Monitoring } from "@src/modules/monitoring/entities/monitoring.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "monitoring_agendas" })
export class MonitoringAgenda extends EntityWithDates {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id!: string;

  @Column({ name: "start_date", type: "timestamptz" })
  public startDate!: Date;

  @Column({ name: "end_date", type: "timestamptz" })
  public endDate!: Date;

  @Column({ name: "places_taken", type: "int", default: 0 })
  public placesTaken!: number;

  @JoinColumn({ name: "monitoring_id" })
  @ManyToOne(() => Monitoring, (monitoring) => monitoring.agendas)
  public monitoring!: Monitoring;

  @OneToMany(() => MonitoringSchedule, (userAgenda) => userAgenda.agenda)
  public schedules!: MonitoringSchedule[];
}
