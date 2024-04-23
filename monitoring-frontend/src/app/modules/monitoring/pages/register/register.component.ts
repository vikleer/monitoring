import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from "@src/environments/environment";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public userForm!: FormGroup;
  public httpClient = inject(HttpClient);
  private endpoint = `${environment.API_URL}/auth/sign-up`;
  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  registerUser() {
    if (this.userForm.valid) {
      this.httpClient.post(this.endpoint, this.userForm).subscribe((data) => {
        console.warn('Usuario registrado', data)
      })

    }
  }
}
