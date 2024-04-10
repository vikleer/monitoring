import { Injectable } from "@nestjs/common";
import {
  AppAbility,
  createAbility,
} from "@src/modules/auth/authorization/ability";
import { UserAuthorization } from "@src/modules/auth/entities/user-authorization.entity";
import { UserPermission } from "@src/modules/auth/entities/user-permission.entity";
import { User } from "@src/modules/users/entities/user.entity";
import { interpolate } from "@src/utils/interpolate";

@Injectable()
export class AbilityService {
  /**
   * Grants the ability to a user based on their authorizations and the provided context.
   *
   * @param user - The user for whom the ability is being granted.
   * @param context - The context in which the ability is being granted.
   * @returns The granted ability.
   */
  public grantAbility<Context>(user: User, context: Context): AppAbility {
    const permissions = this.merge(user.authorizations);
    const ability = createAbility(interpolate(permissions, context));

    return ability;
  }

  /**
   * Merges the permissions from multiple user authorizations into a single array of user permissions.
   *
   * @param authorizations - An array of user authorizations.
   * @returns An array of user permissions.
   */
  private merge(authorizations: UserAuthorization[]): UserPermission[] {
    const permissions = authorizations
      .map((authorization) => authorization.role.permissions)
      .flat();

    return permissions;
  }
}
