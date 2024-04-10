import { EntityWithDates } from "@src/modules/common/entities/with-dates.entity";
import { AcademicProgram } from "@src/modules/degrees/entities/academic-program.entity";
import { Monitoring } from "@src/modules/monitoring/entities/monitoring.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "degree_subjects" })
export class DegreeSubject extends EntityWithDates {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id!: string;

  @Column({ name: "name", type: "varchar", unique: true })
  public name!: string;

  @OneToMany(() => Monitoring, (monitoring) => monitoring.subject)
  public monitoring!: Monitoring[];

  @OneToMany(
    () => AcademicProgram,
    (academicProgram) => academicProgram.subject,
  )
  public academicPrograms!: AcademicProgram[];
}
