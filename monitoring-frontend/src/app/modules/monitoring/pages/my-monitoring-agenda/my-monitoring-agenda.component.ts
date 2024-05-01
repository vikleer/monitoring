import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit } from "@angular/core";
import { MonitoringAgenda } from "@src/app/modules/monitoring/entities/monitoring-agenda";
import { MonitoringAgendasService } from "@src/app/modules/monitoring/services/monitoring-agendas/monitoring-agendas.service";
import { environment } from "@src/environments/environment";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { RouterModule } from "@angular/router";
import { UserService } from "@src/app/modules/common/services/user-service.service";

@Component({
  selector: "app-my-monitoring-agenda",
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, ButtonModule],
  templateUrl: "./my-monitoring-agenda.component.html",
  styleUrl: "./my-monitoring-agenda.component.css",
})
export class MyMonitoringAgendaComponent implements OnInit {
  public monitoringAgendasService = inject(MonitoringAgendasService);
  public httpClient = inject(HttpClient);
  public userService = inject(UserService)

  public monitoringAgendas: MonitoringAgenda[] = [];

  public ngOnInit(): void {
    this.getAgenda();
    this.userService
  }

  public getAgenda(): void {
    this.monitoringAgendasService
      .findCreated({ createdById: this.userService.userID })
      .subscribe({
        next: (monitoringAgendas) => {
          this.monitoringAgendas = monitoringAgendas;
        },
      });
  }
}
