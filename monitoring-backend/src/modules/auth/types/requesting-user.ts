import { User } from "@src/modules/users/entities/user.entity";

export type RequestingUser = {
  id: string;
  tokens: {
    accessToken?: string;
    refreshToken?: string;
  };
  entity: User;
};
