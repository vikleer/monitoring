import { Request } from "express";

/**
 * Custom error class for when the Authorization header is missing.
 */
export class AuthorizationHeaderMissingError extends Error {
  public constructor() {
    super("Authorization header is missing");
  }
}

/**
 * Extracts the bearer token from the request headers.
 *
 * @param request - The request object.
 * @returns The bearer token extracted from the request headers.
 * @throws AuthorizationHeaderMissingError If the authorization header is missing.
 */
export function extractBearerToken(request: Request): string {
  const authorization = request.headers["authorization"];

  if (!authorization) throw new AuthorizationHeaderMissingError();

  const token = authorization.split(" ")[1];

  return token;
}
