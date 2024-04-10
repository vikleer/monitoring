import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * Decorator that retrieves the user ID from the request object.
 *
 * @param data - The decorator data (not used in this case).
 * @param context - The execution context.
 * @returns The user ID extracted from the request object.
 */
export const GetUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();

    return request.user["userId"];
  },
);
