import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MilitaryToNormalTimePipe } from "@src/app/modules/common/pipes/military-to-normal-time.pipe";
import { WeekDayPipe } from "@src/app/modules/common/pipes/week-day.pipe";
import { TIMES } from "@src/app/modules/monitoring/constants/times";
import { WEEKDAYS } from "@src/app/modules/monitoring/constants/weekdays";
import { CreateMonitoringDto } from "@src/app/modules/monitoring/dto/create-monitoring.dto";
import { DegreeSubject } from "@src/app/modules/monitoring/entities/degree-subject";
import { Monitoring } from "@src/app/modules/monitoring/entities/monitoring";
import { DegreeSubjectsService } from "@src/app/modules/monitoring/services/degree-subjects/degree-subjects.service";
import { MonitoringService } from "@src/app/modules/monitoring/services/monitoring/monitoring.service";
import { CreateMonitoringGroup } from "@src/app/modules/monitoring/types/create-monitoring-form.type";
import { environment } from "@src/environments/environment";
import { MessageService } from "primeng/api";
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
  ],
  providers: [MessageService],
  templateUrl: "./my-monitoring-page.component.html",
  styleUrl: "./my-monitoring-page.component.css",
})
export class MyMonitoringPageComponent implements OnInit {
  public degreeSubjectsService = inject(DegreeSubjectsService);
  public monitoringService = inject(MonitoringService);
  public formBuilder = inject(FormBuilder);
  public messageService = inject(MessageService);

  public monitoring: Monitoring[] = [];
  public subjects: DegreeSubject[] = [];
  public weekDays = WEEKDAYS;
  public times = TIMES;

  public isCreateMonitoringModalOpen = false;

  public createMonitoringForm!: FormGroup<CreateMonitoringGroup>;

  public constructor() {
    this.createMonitoringForm = this.formBuilder.group<CreateMonitoringGroup>({
      title: this.formBuilder.control("", {
        nonNullable: true,
        validators: [Validators.required],
      }),
      description: this.formBuilder.control("", {
        nonNullable: true,
        validators: [Validators.required],
      }),
      maxAvailablePlaces: this.formBuilder.control(3, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1), Validators.max(3)],
      }),
      subject: this.formBuilder.control(null, {
        validators: [Validators.required],
      }),
      weekDay: this.formBuilder.control(null, {
        validators: [Validators.required],
      }),
      startTime: this.formBuilder.control(TIMES[0], {
        nonNullable: true,
        validators: [Validators.required],
      }),
      endTime: this.formBuilder.control(TIMES[1], {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public ngOnInit(): void {
    this.getDegreeSubjects();
    this.getMonitoring();
  }

  public openCreateMonitoringModal(): void {
    this.isCreateMonitoringModalOpen = true;
  }

  public closeCreateMonitoringModal(): void {
    this.isCreateMonitoringModalOpen = false;
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

  public getDegreeSubjects(): void {
    this.degreeSubjectsService.findAll().subscribe({
      next: (subjects) => {
        this.subjects = subjects;
      },
    });
  }

  public createMonitoring(): void {
    if (this.createMonitoringForm.invalid) return;

    const {
      title,
      description,
      maxAvailablePlaces,
      subject,
      weekDay,
      startTime,
      endTime,
    } = this.createMonitoringForm.getRawValue();

    const createMonitoringDto: CreateMonitoringDto = {
      title,
      description,
      maxAvailablePlaces,
      subjectId: subject!.id,
      availabilities: [
        {
          type: "weekly",
          recurrence: {
            type: "weekly",
            weekDays: [
              {
                day: weekDay!.value,
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

        this.isCreateMonitoringModalOpen = false;

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
  }
}
