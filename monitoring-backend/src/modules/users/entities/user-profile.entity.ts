import { EntityWithDates } from "@src/modules/common/entities/with-dates.entity";
import { Degree } from "@src/modules/degrees/entities/degree.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "user_profiles" })
export class UserProfile extends EntityWithDates {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id!: string;

  @Column({ name: "first_name", type: "varchar" })
  public firstName!: string;

  @Column({ name: "last_name", type: "varchar" })
  public lastName!: string;

  @Column({ name: "age", type: "int" })
  public age!: number;

  @Column({ name: "gender", type: "varchar" })
  public gender!: string;

  @Column({ name: "overview", type: "varchar" })
  public overview!: string;

  @JoinColumn({ name: "degree_id" })
  @ManyToOne(() => Degree, (degree) => degree.profiles)
  public degree!: Degree;
}
