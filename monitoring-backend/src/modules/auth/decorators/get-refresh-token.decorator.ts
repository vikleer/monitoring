import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * Custom decorator to retrieve the refresh token from the request object.
 *
 * @param data - The decorator data (not used in this case).
 * @param context - The execution context containing the request object.
 * @returns The refresh token extracted from the request object.
 */
export const GetRefreshToken = createParamDecorator(
  (data: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();

    return request.user["refreshToken"];
  },
);
