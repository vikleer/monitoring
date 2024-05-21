import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MAXPLACES } from "@src/app/modules/monitoring/constants/maxPlaces";
import { TIMES } from "@src/app/modules/monitoring/constants/times";
import { WEEKDAYS } from "@src/app/modules/monitoring/constants/weekdays";
import { DegreeSubject } from "@src/app/modules/monitoring/entities/degree-subject";
import { Monitoring } from "@src/app/modules/monitoring/entities/monitoring";
import { DegreeSubjectsService } from "@src/app/modules/monitoring/services/degree-subjects/degree-subjects.service";
import { MonitoringFormGroup } from "@src/app/modules/monitoring/types/create-monitoring-form.type";
import { MonitoringSubmitted } from "@src/app/modules/monitoring/types/monitoring-submitted.type";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { SelectItem } from 'primeng/api';

@Component({
  selector: "app-monitoring-management",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
  ],
  providers: [MessageService],
  templateUrl: "./monitoring-management.component.html",
  styleUrl: "./monitoring-management.component.css",
})
export class MonitoringManagementComponent implements OnInit, OnChanges {
  public degreeSubjectsService = inject(DegreeSubjectsService);
  public formBuilder = inject(FormBuilder);

  @Input()
  public mode: "create" | "edit" = "create";

  @Input()
  public monitoring: Monitoring | null = null;

  @Output()
  public formSubmitted = new EventEmitter<MonitoringSubmitted>();

  @Output()
  public formCancelled = new EventEmitter<void>();

  public monitoringForm!: FormGroup<MonitoringFormGroup>;

  public subjects: DegreeSubject[] = [];
  public weekDays = WEEKDAYS;
  public times = TIMES;

  public maxAvailablePlacesOptions: SelectItem[] = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 }
  ];

  public constructor() {
    this.setupInitialForm();
  }

  public ngOnChanges(): void {
    if (this.monitoring) {
      this.setupForm();
    }
  }

  public ngOnInit(): void {
    this.getDegreeSubjects();
  }

  public setupInitialForm(): void {
    this.monitoringForm = this.formBuilder.group<MonitoringFormGroup>({
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

  public setupForm(): void {
    const title = this.monitoring?.title;
    const description = this.monitoring?.description;
    const maxAvailablePlaces = this.monitoring?.maxAvailablePlaces;

    const subject = this.subjects.find(
      (subject) => subject.id === this.monitoring?.subject.id,
    );

    const weekDay = this.weekDays.find(
      (weekDay) =>
        weekDay.value ===
        this.monitoring?.availabilities[0].recurrence.weekDays[0].day,
    );

    const start =
      this.monitoring?.availabilities[0].recurrence.weekDays[0].time.start;

    const startTime = this.times.find((time) => time.militar === start);

    const end =
      this.monitoring?.availabilities[0].recurrence.weekDays[0].time.end;

    const endTime = this.times.find((time) => time.militar === end);

    this.monitoringForm.patchValue({
      title,
      description,
      maxAvailablePlaces,
      subject,
      weekDay,
      startTime,
      endTime,
    });
  }

  public getDegreeSubjects(): void {
    this.degreeSubjectsService.findAll().subscribe({
      next: (subjects) => {
        this.subjects = subjects;
      },
    });
  }

  public submitForm(): void {
    if (this.monitoringForm.invalid) return;

    const monitoringSubmitted =
      this.monitoringForm.getRawValue() as MonitoringSubmitted;

    this.formSubmitted.emit(monitoringSubmitted);
  }

  public cancelForm(): void {
    this.formCancelled.emit();
  }
}
