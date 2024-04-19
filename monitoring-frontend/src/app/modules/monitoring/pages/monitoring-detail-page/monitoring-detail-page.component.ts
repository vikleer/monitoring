import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FooterComponent } from "@src/app/modules/common/components/footer/footer.component";
import { NavbarComponent } from "@src/app/modules/common/components/navbar/navbar.component";
import { formatDate } from "@src/app/modules/common/utils/format-date";
import { getDatesInMonth } from "@src/app/modules/common/utils/get-dates-in-month";
import { getEndOfMonth } from "@src/app/modules/common/utils/get-end-of-month";
import { getStartOfMonth } from "@src/app/modules/common/utils/get-start-of-month";
import { splitDate } from "@src/app/modules/common/utils/split-date";
import { Monitoring } from "@src/app/modules/monitoring/entities/monitoring";
import { MonitoringAgenda } from "@src/app/modules/monitoring/entities/monitoring-agenda";
import { MonitoringAgendasService } from "@src/app/modules/monitoring/services/monitoring-agendas/monitoring-agendas.service";
import { MonitoringSchedulesService } from "@src/app/modules/monitoring/services/monitoring-schedules/monitoring-schedules.service";
import { MonitoringService } from "@src/app/modules/monitoring/services/monitoring/monitoring.service";
import {
  getDate,
  getMonth,
  getTime,
  getYear,
  parseISO,
  setHours,
} from "date-fns";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CalendarModule, CalendarMonthChangeEvent } from "primeng/calendar";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { ToastModule } from "primeng/toast";

@Component({
  selector: "app-monitoring-detail-page",
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    CalendarModule,
    ToastModule,
    NavbarComponent,
    FooterComponent,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: "./monitoring-detail-page.component.html",
  styleUrl: "./monitoring-detail-page.component.css",
})
export class MonitoringDetailPageComponent implements OnInit {
  public monitoringService = inject(MonitoringService);
  public monitoringAgendaService = inject(MonitoringAgendasService);
  public monitoringSchedulesService = inject(MonitoringSchedulesService);

  public activatedRoute = inject(ActivatedRoute);
  public router = inject(Router);
  public confirmationService = inject(ConfirmationService);
  public messageService = inject(MessageService);

  public monitoring!: Monitoring;
  public monitoringAgendas: MonitoringAgenda[] = [];

  public selectedMonitoringAgenda: MonitoringAgenda | null = null;

  public isAgendasCalendarOpen = false;
  public isAgendasCalendarDisabled = true;
  public currentMonth = getMonth(new Date());
  public currentYear = getYear(new Date());
  public disabledDates: Date[] = getDatesInMonth({
    month: this.currentMonth,
    year: this.currentYear,
  });
  public datesToSkip: Date[] = [];

  public isAgendaDetailModalOpen = false;

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.monitoring = data["monitoring"] as Monitoring;
    });
  }

  public openAgendasCalendarModal(): void {
    this.isAgendasCalendarOpen = true;
    this.setupMonitoringAgendas();
  }

  public openAgendaDetailModal(date: Date): void {
    this.isAgendaDetailModalOpen = true;

    this.selectedMonitoringAgenda = this.monitoringAgendas.find((agenda) => {
      return getTime(parseISO(splitDate(agenda.startDate))) === getTime(date);
    })!;

    this.confirmationService.confirm({
      header: "Agendar monitoria",
      message: " Por favor, confirme para seguir adelante",
      acceptIcon: "pi pi-check mr-2",
      rejectIcon: "pi pi-times mr-2",
      rejectButtonStyleClass: "p-button-sm",
      acceptButtonStyleClass: "p-button-outlined p-button-sm",
      acceptLabel: "Confirmar",
      rejectLabel: "Cancelar",
      accept: () => {
        if (!this.selectedMonitoringAgenda) return;

        this.monitoringSchedulesService
          .schedule({
            monitoringId: this.monitoring.id,
            startDate: this.selectedMonitoringAgenda.startDate,
            endDate: this.selectedMonitoringAgenda.endDate,
          })
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: "success",
                summary: "Éxito",
                detail: "Monitoria agendada.",
              });

              this.isAgendasCalendarOpen = false;
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

  public setCurrentMonth(event: CalendarMonthChangeEvent): void {
    if (!event.month || !event.year) return;
    this.currentMonth = event.month - 1;
    this.currentYear = event.year;
    this.setupMonitoringAgendas();
  }

  public calculateDisabledDates(): Date[] {
    // Dates to skip are the dates that have available places and are in the future
    this.datesToSkip = this.monitoringAgendas
      .filter((agenda) => {
        const agendaStartDate = new Date(agenda.startDate);
        agendaStartDate.setHours(0, 0, 0, 0);

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const hasAvailablePlaces =
          agenda.placesTaken < this.monitoring.maxAvailablePlaces;

        const isInFuture = getTime(agendaStartDate) > getTime(currentDate);

        return hasAvailablePlaces && isInFuture;
      })
      .map((agenda) => {
        const date = new Date(agenda.startDate);
        date.setHours(0, 0, 0, 0);

        return date;
      });

    const disabledDates = getDatesInMonth({
      month: this.currentMonth,
      year: this.currentYear,
      datesToSkip: this.datesToSkip,
    });

    return disabledDates;
  }

  public setupMonitoringAgendas(): void {
    this.isAgendasCalendarDisabled = true;

    this.monitoringAgendaService
      .findAll({
        monitoringId: this.monitoring.id,
        startDate: formatDate(
          getStartOfMonth(this.currentMonth, this.currentYear),
        ),
        endDate: formatDate(getEndOfMonth(this.currentMonth, this.currentYear)),
      })
      .subscribe({
        next: (agendas) => {
          this.monitoringAgendas = agendas;
          this.disabledDates = this.calculateDisabledDates();
          this.isAgendasCalendarDisabled = false;
        },
      });
  }

  public isAvailableDate(date: { day: number; otherMonth: boolean }): boolean {
    return this.datesToSkip.some((dateToSkip) => {
      return getDate(dateToSkip) === date.day && !date.otherMonth;
    });
  }
}
