import { UserRole } from "@src/modules/auth/entities/user-role.entity";
import { EntityWithDates } from "@src/modules/common/entities/with-dates.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "user_permissions" })
export class UserPermission extends EntityWithDates {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id!: string;

  @Column({ name: "action", type: "varchar" })
  public action!: string;

  @Column({ name: "subject", type: "varchar" })
  public subject!: string;

  @Column({ name: "conditions", type: "json", nullable: true })
  public conditions!: object;

  // One permission is owned by one single role, and one role can have multiple permissions
  @JoinColumn({ name: "role_id" })
  @ManyToOne(() => UserRole, (role) => role.permissions)
  public role!: UserRole;
}
