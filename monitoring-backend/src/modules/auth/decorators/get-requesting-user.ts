import { RequestingUser } from "@src/modules/auth/types/requesting-user";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * Decorator that retrieves the requesting user from the request object.
 * If `data` is provided, it returns the specific property of the requesting user.
 * If `data` is not provided, it returns the entire requesting user object.
 *
 * @param data - Optional property name of the requesting user object.
 * @param context - ExecutionContext object containing the request object.
 * @returns The requesting user or the specified property of the requesting user.
 */
export const GetRequestingUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext): RequestingUser => {
    const request = context.switchToHttp().getRequest();

    if (!data) return request.user;

    return request.user[data];
  },
);
