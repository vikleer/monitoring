import { CommonModule, NgFor } from "@angular/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { DegreesService } from "@src/app/modules/auth/services/degrees.service";
import { SweetAlertService } from "@src/app/modules/auth/services/sweet-alert/sweet-alert.service";
import { Degree } from "@src/app/modules/auth/types/degree";
import { environment } from "@src/environments/environment";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { PasswordModule } from "primeng/password";
import { ToastModule } from "primeng/toast";
import { take } from "rxjs";

@Component({
  selector: "app-register-page",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgFor,
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    InputNumberModule,
    DropdownModule,
    InputTextareaModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: "./register-page.component.html",
  styleUrl: "./register-page.component.css",
})
export class RegisterPageComponent implements OnInit {
  private endpoint = `${environment.API_URL}/auth/sign-up`;

  public httpClient = inject(HttpClient);
  private swal = inject(SweetAlertService)

  public registerForm!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    profile: FormGroup<{
      firstName: FormControl<string>;
      lastName: FormControl<string>;
      age: FormControl<number>;
      gender: FormControl<{ name: string; value: string } | null>;
      overview: FormControl<string>;
      degree: FormControl<Degree | null>;
    }>;
  }>;

  public genders = [
    { name: "Masculino", value: "Masculino" },
    { name: "Femenino", value: "Femenino" },
    { name: "Otro", value: "Femenino"}
  ];

  public degress: Degree[] = [];

  public constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private messageService: MessageService,
    private degreesService: DegreesService,
  ) {
    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      profile: this.fb.group({
        firstName: ["", [Validators.required]],
        lastName: ["", [Validators.required]],
        age: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
        gender: new FormControl<{ name: string; value: string } | null>(null, {
          nonNullable: false,
          validators: [Validators.required],
        }),
        overview: ["", [Validators.required]],
        degree: new FormControl<Degree | null>(null, {
          nonNullable: false,
          validators: [Validators.required],
        }),
      }),
    });
  }

  public ngOnInit(): void {
    this.degreesService
      .getDregrees()
      .pipe(take(1))
      .subscribe((data: Degree[]) => {
        this.degress = data;
        console.warn(data);
      });
  }

  public register(): void {
    if (this.registerForm.invalid) return;

    const values = this.registerForm.getRawValue();

    const createUserDto = {
      email: values.email.toLowerCase(),
      password: values.password,
      profile: {
        firstName: values.profile.firstName,
        lastName: values.profile.lastName,
        age: values.profile.age,
        gender: values.profile.gender?.value,
        overview: values.profile.overview,
        degreeId: values.profile.degree?.id,
      },
    };

    this.httpClient.post(this.endpoint, createUserDto).subscribe({
      next: () => {
        this.swal.showRegisterSuccessNotification();
        //*this.messageService.add({
        //*  severity: "sucess",
        //*  detail: "Usuario registrado exitosamente",
        //*});

        this.router.navigate(["/login"]);
      },
      error: (httpError: HttpErrorResponse) => {
        this.messageService.add({
          severity: "error",
          detail: httpError.error.message,
        });
      },
    });
  }
}
