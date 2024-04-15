import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages/monitoring-page/monitoring-page.component").then(
        (m) => m.MonitoringPageComponent,
      ),
  },
  {
    path: ":id",
    loadComponent: () =>
      import(
        "./pages/monitoring-detail-page/monitoring-detail-page.component"
      ).then((m) => m.MonitoringDetailPageComponent),
  },
];
