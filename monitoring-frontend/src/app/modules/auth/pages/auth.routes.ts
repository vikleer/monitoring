import { Routes } from "@angular/router";
import { LoginPageComponent } from "@src/app/modules/auth/pages/login-page/login-page.component";
import { RegisterPageComponent } from "@src/app/modules/auth/pages/register-page/register-page.component";
import { avoidNavigatingWhenAuthGuard } from "@src/app/modules/common/guards/avoid-navigating-when-auth.guard";

export const routes: Routes = [
  {
    path: "login",
    component: LoginPageComponent,
    canMatch: [avoidNavigatingWhenAuthGuard],
  },
  {
    path: "register",
    component: RegisterPageComponent,
    canMatch: [avoidNavigatingWhenAuthGuard],
  },
];
