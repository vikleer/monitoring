import { EntityWithDates } from "@src/modules/common/entities/with-dates.entity";
import { AVAILABILITY_TYPES } from "@src/modules/monitoring/constants/availability-types";
import { Monitoring } from "@src/modules/monitoring/entities/monitoring.entity";
import { MonitoringAvailabilityType } from "@src/modules/monitoring/types/monitoring-availability-type";
import { MonitoringRecurrence } from "@src/modules/monitoring/types/monitoring-recurrence";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "monitoring_availabilities" })
export class MonitoringAvailability extends EntityWithDates {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id!: string;

  @Column({
    name: "type",
    type: "enum",
    enum: AVAILABILITY_TYPES,
  })
  public type!: MonitoringAvailabilityType;

  @Column({ name: "recurrence", type: "json" })
  public recurrence!: MonitoringRecurrence;

  @JoinColumn({ name: "monitoring_id" })
  @ManyToOne(() => Monitoring, (monitoring) => monitoring.availabilities)
  public monitoring!: Monitoring;
}
