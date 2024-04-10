import { EntityWithDates } from "@src/modules/common/entities/with-dates.entity";
import { DegreeSubject } from "@src/modules/degrees/entities/degree-subject.entity";
import { MonitoringAgenda } from "@src/modules/monitoring/entities/monitoring-agenda.entity";
import { MonitoringAvailability } from "@src/modules/monitoring/entities/monitoring-availability.entity";
import { User } from "@src/modules/users/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "monitoring" })
export class Monitoring extends EntityWithDates {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id!: string;

  @Column({ name: "title", type: "varchar" })
  public title!: string;

  @Column({ name: "description", type: "varchar" })
  public description!: string;

  @Column({ name: "max_available_places", type: "int", default: 1 })
  public maxAvailablePlaces!: number;

  @JoinColumn({ name: "created_by" })
  @ManyToOne(() => User, (user) => user.monitoring)
  public createdBy!: User;

  @JoinColumn({ name: "subject_id" })
  @ManyToOne(() => DegreeSubject, (subject) => subject.monitoring)
  public subject!: DegreeSubject;

  @OneToMany(
    () => MonitoringAvailability,
    (availability) => availability.monitoring,
  )
  public availabilities!: MonitoringAvailability[];

  @OneToMany(() => MonitoringAgenda, (agenda) => agenda.monitoring)
  public agendas!: MonitoringAgenda[];
}
