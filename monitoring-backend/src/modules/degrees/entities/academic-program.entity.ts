import { EntityWithDates } from "@src/modules/common/entities/with-dates.entity";
import { DegreeSubject } from "@src/modules/degrees/entities/degree-subject.entity";
import { Degree } from "@src/modules/degrees/entities/degree.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "academic_programs" })
export class AcademicProgram extends EntityWithDates {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id!: string;

  @JoinColumn({ name: "degree_id" })
  @ManyToOne(() => Degree, (degree) => degree.academicPrograms)
  public degree!: Degree;

  @JoinColumn({ name: "subject_id" })
  @ManyToOne(() => DegreeSubject, (subject) => subject.academicPrograms)
  public subject!: DegreeSubject;
}
