import type { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "@src/environments/environment";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // TODO: Get the token from storage
  const ACCESS_TOKEN = environment.USER_ACCESS_TOKEN;

  if (ACCESS_TOKEN) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }

  return next(req);
};
