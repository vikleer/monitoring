import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { LoginDto } from "@src/app/modules/auth/pages/login-page/login.dto";
import { UserService } from "@src/app/modules/common/services/user.service";
import { UsersService } from "@src/app/modules/common/services/users.service";
import { environment } from "@src/environments/environment";
import { jwtDecode } from "jwt-decode";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";
import { switchMap, tap } from "rxjs";

@Component({
  selector: "app-login-page",
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    RouterLink,
    ReactiveFormsModule,
    InputTextModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: "./login-page.component.html",
  styleUrl: "./login-page.component.css",
})
export class LoginPageComponent {
  private usersService = inject(UsersService);
  private messageService = inject(MessageService);
  private endpoint = `${environment.API_URL}/auth/sign-in`;

  public loginForm!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  public constructor(
    private fb: NonNullableFormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private userService: UserService,
  ) {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  public login(): void {
    this.httpClient
      .post<LoginDto>(this.endpoint, this.loginForm.getRawValue())
      .pipe(
        tap((login) => {
          const decode = jwtDecode<{ user: { id: string } }>(login.accessToken);
          this.userService.login(login.accessToken, decode.user.id);
        }),
        switchMap(() => {
          return this.usersService.findOne(this.userService.userId).pipe();
        }),
        tap((user) => {
          this.userService.setUser(user);
        }),
      )
      .subscribe({
        next: () => {
          this.router.navigate(["/monitoring"]);
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
