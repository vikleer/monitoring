import { inject } from "@angular/core";
import { CanMatchFn, Router } from "@angular/router";
import { UserService } from "@src/app/modules/common/services/user.service";

export const allowNavigatingWhenAuthGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const userService = inject(UserService);

  return userService.isAuthenticated ? true : router.createUrlTree(["/login"]);
};
