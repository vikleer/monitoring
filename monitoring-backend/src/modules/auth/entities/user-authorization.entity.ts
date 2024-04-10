import { UserRole } from "@src/modules/auth/entities/user-role.entity";
import { EntityWithDates } from "@src/modules/common/entities/with-dates.entity";
import { User } from "@src/modules/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user_authorizations" })
export class UserAuthorization extends EntityWithDates {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id!: string;

  @JoinColumn({ name: "role_id" })
  @ManyToOne(() => UserRole, (role) => role.authorizations)
  public role!: UserRole;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User, (user) => user.authorizations)
  public user!: User;
}
