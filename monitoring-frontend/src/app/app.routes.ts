import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "monitoring",
    loadChildren: () =>
      import("./modules/monitoring/monitoring.routes").then((m) => m.routes),
  },
  {
    path: "**",
    redirectTo: "monitoring",
  },
];
