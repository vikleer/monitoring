import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit } from "@angular/core";
import { MonitoringAgenda } from "@src/app/modules/monitoring/entities/monitoring-agenda";
import { MonitoringAgendasService } from "@src/app/modules/monitoring/services/monitoring-agendas/monitoring-agendas.service";
import { environment } from "@src/environments/environment";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { RouterModule } from "@angular/router";

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

  public monitoringAgendas: MonitoringAgenda[] = [];

  public ngOnInit(): void {
    this.getAgenda();
  }

  public getAgenda(): void {
    this.monitoringAgendasService
      .findCreated({ createdById: environment.USER_ID })
      .subscribe({
        next: (monitoringAgendas) => {
          this.monitoringAgendas = monitoringAgendas;
        },
      });
  }
}
