import { BasePayload } from "@src/modules/auth/types/base-payload";

export type RefreshTokenPayload = BasePayload & {
  user: { id: string };
};
