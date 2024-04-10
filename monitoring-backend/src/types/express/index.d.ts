import { RequestingUser } from "@src/modules/auth/types/requesting-user";

declare global {
  namespace Express {
    export interface User extends RequestingUser {}
  }
}
