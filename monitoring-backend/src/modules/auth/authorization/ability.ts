import { Action } from "@src/modules/auth/authorization/actions";
import { Subjects } from "@src/modules/auth/authorization/subject";
import { createMongoAbility, MongoAbility, RawRuleOf } from "@casl/ability";

export type AppAbility = MongoAbility<[Action, Subjects]>;

export function createAbility(rules: RawRuleOf<AppAbility>[]): AppAbility {
  return createMongoAbility<AppAbility>(rules);
}
