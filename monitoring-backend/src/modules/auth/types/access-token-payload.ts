import { BasePayload } from "@src/modules/auth/types/base-payload";

export type AccessTokenPayload = BasePayload & {
  user: { id: string };
};
