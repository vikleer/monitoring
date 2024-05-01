import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from "@src/environments/environment";
import {NgFor} from '@angular/common';
import { take, } from 'rxjs';
import { GetDegreesService } from '@src/app/modules/auth/services/getDegrees.service';
import { Degree } from '@src/app/modules/auth/types/degree';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule
   ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  public userForm!: FormGroup;
  public http = inject(HttpClient);
  private endpoint = `${environment.API_URL}/auth/sign-up`;
  public infoDregree!: Array<Degree>;
  constructor(
    private fb: FormBuilder,
    private Degrees: GetDegreesService,
    private route: Router
  ) {}

  ngOnInit() {
    //?
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profile: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        age: ['', Validators.required],
        gender: ['', Validators.required],
        overview: [''],
        degreeId: ['']
      })
    });

    //?
    this.Degrees.getDregrees().pipe(take(1)).subscribe((data: Degree[]) => { this.infoDregree = data });
  }

  /**
   *
   */
  public registerUser() {
    if (this.userForm.valid) {
      this.http.post(this.endpoint, this.userForm.getRawValue()).subscribe((data: object) => {
        console.warn('Usuario registrado', data)
      })
    }
  }

  /**
   *
   */
  public goLogin() {
    this.route.navigateByUrl('/login')
  }

}
