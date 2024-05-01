import type { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { UserService } from "@src/app/modules/common/services/user-service.service";
import { environment } from "@src/environments/environment";



export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const accessToken = inject(UserService)


  // TODO: Get the token from storage
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
