import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * Custom decorator to retrieve the access token from the request object.
 *
 * @param data - The decorator data (undefined in this case).
 * @param context - The execution context.
 * @returns The access token string.
 */
export const GetAccessToken = createParamDecorator(
  (data: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();

    return request.user["accessToken"];
  },
);
