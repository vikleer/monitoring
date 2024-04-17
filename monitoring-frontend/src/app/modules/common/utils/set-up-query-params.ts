import { HttpParams } from "@angular/common/http";

/**
 * Sets up query parameters for an HTTP request.
 *
 * @param params - The query parameters as a record of key-value pairs.
 * @returns The HTTP parameters object with the query parameters set.
 */
export function setUpQueryParams(
  params: Record<string, unknown> = {},
): HttpParams {
  let httpParams: HttpParams = new HttpParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) httpParams = httpParams.set(key, value.toString());
  });

  return httpParams;
}
