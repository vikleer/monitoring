import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MonitoringSchedule } from "@src/app/modules/monitoring/entities/monitoring-schedule";
import { MonitoringSchedulesService } from "@src/app/modules/monitoring/services/monitoring-schedules/monitoring-schedules.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TableModule } from "primeng/table";
import { TooltipModule } from "primeng/tooltip";
import { ToastModule } from "primeng/toast";
import { environment } from "@src/environments/environment";
import { UserService } from "@src/app/modules/common/services/user-service.service";

@Component({
  selector: "app-my-agenda-page",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: "./my-agenda-page.component.html",
  styleUrl: "./my-agenda-page.component.css",
})
export class MyAgendaPageComponent implements OnInit {
  public userService = inject(UserService)
  public monitoringScheduleService = inject(MonitoringSchedulesService);

  public confirmationService = inject(ConfirmationService);
  public messageService = inject(MessageService);

  public selectedMonitoringSchedule: MonitoringSchedule | null = null;
  public monitoringSchedules: MonitoringSchedule[] = [];

  public ngOnInit(): void {
    this.getMonitoringSchedules();
    this.userService
  }

  public getMonitoringSchedules(): void {
    // TODO: Get id from storage
    this.monitoringScheduleService
      //*.findAll({ userId: this.userService.userID })
      .findAll({ userId: this.userService.userID })
      .subscribe({
        next: (monitoringSchedules) => {
          this.monitoringSchedules = monitoringSchedules;
          console.warn(monitoringSchedules);
        },
      });
  }

  public openUnscheduleMonitoringModal(
    monitoringSchedule: MonitoringSchedule,
  ): void {
    this.selectedMonitoringSchedule = monitoringSchedule;

    this.confirmationService.confirm({
      header: "Cancelar monitoria",
      message: "Por favor, confirme para cancelar",
      acceptIcon: "pi pi-check mr-2",
      rejectIcon: "pi pi-times mr-2",
      rejectButtonStyleClass: "p-button-sm",
      acceptButtonStyleClass: "p-button-outlined p-button-sm",
      acceptLabel: "Confirmar",
      rejectLabel: "Cancelar",
      accept: () => {
        this.monitoringScheduleService
          .unschedule(monitoringSchedule.id)
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: "success",
                summary: "Éxito",
                detail: "Monitoria cancelada.",
              });

              this.getMonitoringSchedules();
            },
          });
      },
      reject: () => {},
    });
  }
}
