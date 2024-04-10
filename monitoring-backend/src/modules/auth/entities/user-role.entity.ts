import { UserAuthorization } from "@src/modules/auth/entities/user-authorization.entity";
import { UserPermission } from "@src/modules/auth/entities/user-permission.entity";
import { EntityWithDates } from "@src/modules/common/entities/with-dates.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user_roles" })
export class UserRole extends EntityWithDates {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id!: string;

  @Column({ name: "name", type: "varchar" })
  public name!: string;

  @Column({ name: "description", type: "varchar" })
  public description!: string;

  // One role can have multiple permissions, and each permission is owned by one single role
  @OneToMany(() => UserPermission, (permission) => permission.role)
  public permissions!: UserPermission[];

  @OneToMany(() => UserAuthorization, (authorization) => authorization.role)
  public authorizations!: UserAuthorization[];
}
