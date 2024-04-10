import { ForbiddenException } from "@nestjs/common";

export function throwForbidden(message?: string): never {
  throw new ForbiddenException(
    message ??
      "You do not have permission to access this resource or perform this action.",
  );
}
