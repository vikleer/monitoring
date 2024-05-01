import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { UserService } from '@src/app/modules/common/services/user-service.service';
import { jwtDecode } from 'jwt-decode';



@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CardModule, ButtonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  public loginForm!: FormGroup;
  private endpoint = `${environment.API_URL}/auth/sign-in`;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: Router,
    private userService: UserService
  ) {

  }

  ngOnInit() {
    //?
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  /**
   *
   */
  public validateUSer() {
    this.http.post<{
      accessToken: string;
      refreshToken: string;
    }>(this.endpoint, this.loginForm.getRawValue()).subscribe((data) => {
      this.userService.accessToken = data.accessToken;
      const decode = jwtDecode<{user: {id:string}}>(data.accessToken)
      this.userService.userID = decode.user.id;
      this.route.navigateByUrl('/monitoring')
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('UserID', decode.user.id);
    })


  }

}
