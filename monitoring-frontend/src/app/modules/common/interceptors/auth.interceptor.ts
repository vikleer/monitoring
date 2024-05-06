import type { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { UserService } from "@src/app/modules/common/services/user.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = inject(UserService);

  const ACCESS_TOKEN = accessToken.accessToken;

  if (ACCESS_TOKEN) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }

  return next(req);
};
