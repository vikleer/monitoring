import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./modules/auth/pages/auth.routes").then(m => m.routes)
  },
  {
    path: "monitoring",
    loadChildren: () =>
      import("./modules/monitoring/monitoring.routes").then((m) => m.routes),
  }
];
