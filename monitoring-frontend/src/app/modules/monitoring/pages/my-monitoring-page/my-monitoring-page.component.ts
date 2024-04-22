import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, inject, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MilitaryToNormalTimePipe } from "@src/app/modules/common/pipes/military-to-normal-time.pipe";
import { WeekDayPipe } from "@src/app/modules/common/pipes/week-day.pipe";
import { MonitoringManagementComponent } from "@src/app/modules/monitoring/components/monitoring-management/monitoring-management.component";
import { CreateMonitoringDto } from "@src/app/modules/monitoring/dto/create-monitoring.dto";
import { UpdateMonitoringDto } from "@src/app/modules/monitoring/dto/update-monitoring.dto";
import { Monitoring } from "@src/app/modules/monitoring/entities/monitoring";
import { MonitoringService } from "@src/app/modules/monitoring/services/monitoring/monitoring.service";
import { MonitoringSubmitted } from "@src/app/modules/monitoring/types/monitoring-submitted.type";
import { environment } from "@src/environments/environment";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { TooltipModule } from "primeng/tooltip";

@Component({
  selector: "app-my-monitoring-page",
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule,
    ToastModule,
    MilitaryToNormalTimePipe,
    WeekDayPipe,
    MonitoringManagementComponent,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: "./my-monitoring-page.component.html",
  styleUrl: "./my-monitoring-page.component.css",
})
export class MyMonitoringPageComponent implements OnInit {
  public monitoringService = inject(MonitoringService);
  public confirmationService = inject(ConfirmationService);
  public messageService = inject(MessageService);

  public monitoring: Monitoring[] = [];

  public isCreateMonitoringModalOpen = false;
  public isEditMonitoringModalOpen = false;

  public monitoringToEdit: Monitoring | null = null;

  public constructor() {}

  public ngOnInit(): void {
    this.getMonitoring();
  }

  public openCreateMonitoringModal(): void {
    this.isCreateMonitoringModalOpen = true;
  }

  public closeCreateMonitoringModal(): void {
    this.isCreateMonitoringModalOpen = false;
  }

  public openEditMonitoringModal(monitoring: Monitoring): void {
    this.monitoringToEdit = monitoring;
    this.isEditMonitoringModalOpen = true;
  }

  public closeEditMonitoringModal(): void {
    this.isEditMonitoringModalOpen = false;
  }

  public getMonitoring(): void {
    this.monitoringService
      .findAll({
        createdBy: environment.USER_ID,
      })
      .subscribe({
        next: (monitoring) => {
          this.monitoring = monitoring;
        },
      });
  }

  public createMonitoring(monitoringSubmitted: MonitoringSubmitted): void {
    const {
      title,
      description,
      maxAvailablePlaces,
      subject,
      weekDay,
      startTime,
      endTime,
    } = monitoringSubmitted;

    const createMonitoringDto: CreateMonitoringDto = {
      title,
      description,
      maxAvailablePlaces,
      subjectId: subject.id,
      availabilities: [
        {
          type: "weekly",
          recurrence: {
            type: "weekly",
            weekDays: [
              {
                day: weekDay.value,
                time: { start: startTime.militar, end: endTime.militar },
              },
            ],
          },
        },
      ],
    };

    this.monitoringService.create(createMonitoringDto).subscribe({
      next: () => {
        this.messageService.add({
          severity: "success",
          summary: "Éxito",
          detail: "Monitoria creada.",
        });

        this.getMonitoring();
        this.closeCreateMonitoringModal();
      },
      error: (httpError: HttpErrorResponse) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: httpError.error.message,
        });
      },
    });
  }

  public editMonitoring(monitoringSubmitted: MonitoringSubmitted): void {
    const updateMonitoringDto: UpdateMonitoringDto = {
      title: monitoringSubmitted.title,
      description: monitoringSubmitted.description,
      maxAvailablePlaces: monitoringSubmitted.maxAvailablePlaces,
      subjectId: monitoringSubmitted.subject.id,
    };

    this.monitoringService
      .update(this.monitoringToEdit!.id, updateMonitoringDto)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: "success",
            summary: "Éxito",
            detail: "Monitoria actualizada.",
          });

          this.getMonitoring();
          this.closeEditMonitoringModal();
        },
        error: (httpError: HttpErrorResponse) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: httpError.error.message,
          });
        },
      });
  }

  public cancelMonitoring(monitoring: Monitoring): void {
    this.confirmationService.confirm({
      message:
        "Si cancela, a los estudiantes agendados se les cancelará la monitoria",
      header: "Cancelar monitoria",
      icon: "pi pi-exclamation-triangle",
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      acceptLabel: "Confirmar",
      rejectLabel: "Cancelar",
      accept: () => {
        this.monitoringService.remove(monitoring.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: "success",
              summary: "Éxito",
              detail: "Monitoria cancelada.",
            });

            this.getMonitoring();
          },
          error: (httpError: HttpErrorResponse) => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: httpError.error.message,
            });
          },
        });
      },
    });
  }
}
