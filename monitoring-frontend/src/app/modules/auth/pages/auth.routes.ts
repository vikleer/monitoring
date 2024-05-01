import { Routes } from "@angular/router";
import { LoginPageComponent } from "@src/app/modules/auth/pages/login-page/login-page.component";
import { RegisterPageComponent } from "@src/app/modules/auth/pages/register-page/register-page.component";
import { MonitoringPageComponent } from "@src/app/modules/monitoring/pages/monitoring-page/monitoring-page.component";

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
];
