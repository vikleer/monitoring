import { EntityWithDates } from "@src/modules/common/entities/with-dates.entity";
import { AcademicProgram } from "@src/modules/degrees/entities/academic-program.entity";
import { UserProfile } from "@src/modules/users/entities/user-profile.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "degrees" })
export class Degree extends EntityWithDates {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id!: string;

  @Column({ name: "name", type: "varchar" })
  public name!: string;

  @OneToMany(() => UserProfile, (profile) => profile.degree)
  public profiles!: UserProfile[];

  @OneToMany(() => AcademicProgram, (academicProgram) => academicProgram.degree)
  public academicPrograms!: AcademicProgram[];
}
