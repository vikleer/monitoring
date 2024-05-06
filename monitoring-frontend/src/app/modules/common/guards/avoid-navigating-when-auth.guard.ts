import { inject } from "@angular/core";
import { Router, type CanMatchFn } from "@angular/router";
import { UserService } from "@src/app/modules/common/services/user.service";

export const avoidNavigatingWhenAuthGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const userService = inject(UserService);

  return userService.isAuthenticated
    ? router.createUrlTree(["/monitoring"])
    : true;
};
