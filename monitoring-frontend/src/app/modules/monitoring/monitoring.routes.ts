import { Routes } from "@angular/router";
import { HomeComponent } from "@src/app/modules/monitoring/pages/home/home/home.component";
import { monitoringResolver } from "@src/app/modules/monitoring/resolvers/monitoring.resolver";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages/monitoring-page/monitoring-page.component").then(
        (m) => m.MonitoringPageComponent,
      ),
  },
  {
    path: "home",
    loadComponent: () =>
      import("./pages/home/home/home.component").then(
        (m) => m.HomeComponent,
      )
  },
  {
    path: "profile",
    loadComponent: () =>
      import("./pages/profile/profile.component").then(
        (m) => m.ProfileComponent,
      )
  },
  {
    path: "edit-profile",
    loadComponent: () =>
      import("./pages/edit-profile/edit-profile.component").then(
        (m) => m.EditProfileComponent,
      )
  },
  {
    path: "students",
    loadComponent: () =>
      import("./pages/students-page/students-page.component").then(
        (m) => m.StudentsPageComponent,
      ),
    children: [
      {
        path: "",
        redirectTo: "my-agenda",
        pathMatch: "full",
      },
      {
        path: "my-agenda",
        loadComponent: () =>
          import("./pages/my-agenda-page/my-agenda-page.component").then(
            (m) => m.MyAgendaPageComponent,
          ),
      },
    ],
  },
  {
    path: "monitors",
    loadComponent: () =>
      import("./pages/monitors-page/monitors-page.component").then(
        (m) => m.MonitorsPageComponent,
      ),
    children: [
      {
        path: "",
        redirectTo: "my-monitoring",
        pathMatch: "full",
      },
      {
        path: "my-monitoring",
        loadComponent: () =>
          import(
            "./pages/my-monitoring-page/my-monitoring-page.component"
          ).then((m) => m.MyMonitoringPageComponent),
      },
      {
        path: "my-agenda",
        loadComponent: () =>
          import(
            "./pages/my-monitoring-agenda/my-monitoring-agenda.component"
          ).then((m) => m.MyMonitoringAgendaComponent),
      },
    ],
  },
  {
    path: ":id",
    loadComponent: () =>
      import(
        "./pages/monitoring-detail-page/monitoring-detail-page.component"
      ).then((m) => m.MonitoringDetailPageComponent),
    resolve: { monitoring: monitoringResolver },
  },
];
