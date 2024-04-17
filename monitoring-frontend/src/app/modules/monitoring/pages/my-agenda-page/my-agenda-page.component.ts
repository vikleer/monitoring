import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MonitoringSchedule } from "@src/app/modules/monitoring/entities/monitoring-schedule";
import { MonitoringSchedulesService } from "@src/app/modules/monitoring/services/monitoring-schedules/monitoring-schedules.service";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";

@Component({
  selector: "app-my-agenda-page",
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, ButtonModule],
  templateUrl: "./my-agenda-page.component.html",
  styleUrl: "./my-agenda-page.component.css",
})
export class MyAgendaPageComponent implements OnInit {
  public monitoringScheduleService = inject(MonitoringSchedulesService);

  public monitoringSchedules: MonitoringSchedule[] = [];

  public ngOnInit(): void {
    // TODO: Get id from storage
    this.monitoringScheduleService
      .findAll({ userId: "f7f1933f-1e28-4031-b1a5-f51b1e85bf36" })
      .subscribe({
        next: (monitoringSchedules) => {
          this.monitoringSchedules = monitoringSchedules;
          console.log(this.monitoringSchedules);
        },
      });
  }
}
