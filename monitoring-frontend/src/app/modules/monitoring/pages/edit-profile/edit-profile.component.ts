import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { NavbarComponent } from '@src/app/modules/common/components/navbar/navbar.component';


import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { DegreesService } from "@src/app/modules/auth/services/degrees.service";
import { Degree } from "@src/app/modules/auth/types/degree";
import { environment } from "@src/environments/environment";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { PasswordModule } from "primeng/password";
import { ToastModule } from "primeng/toast";
import { UserService } from '@src/app/modules/common/services/user.service';
import { cleanObject } from '@src/app/modules/common/utils/clean-objects';
import { User } from '@src/app/modules/common/types/user.type';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    NavbarComponent,
    ButtonModule,
    CardModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    InputTextareaModule,
    ReactiveFormsModule
  ],
  providers: [  MessageService],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  private http = inject(HttpClient)
  private userService = inject(UserService);
  private router = inject(Router)

  private endPoint = environment.API_URL+"/users/"+this.userService.userId;


  updateUserData!: FormGroup;
  genderOptions = [
    { name: 'Masculino', value: 'male' },
    { name: 'Femenino', value: 'female' },
    { name: 'Otro', value: 'other' }
  ];
  degreeOptions: Degree[] = []; // Debes poblar esto con tus opciones reales

  constructor(
    private fb: FormBuilder,
    private degree: DegreesService,
    private messageService: MessageService
  ) {
    this.updateUserData = this.fb.group({
      email: new FormControl<string>('', [ Validators.email]),
      password: new FormControl<string>('', [ Validators.minLength(6)]),
      profile: this.fb.group({
        firstName: new FormControl<string>(''),
        lastName: new FormControl<string>(''),
        age: new FormControl<number | null>(null, [Validators.min(0)]),
        gender: new FormControl<{ name: string; value: string } | null>(null),
        overview: new FormControl<string>(''),
        degree: new FormControl<Degree | null>(null)
      })
    });
  }

  ngOnInit(): void {
    this.degree.getDregrees().subscribe(
      data => this.degreeOptions = data
    );
  }

  public updateUser(){
    const data = this.updateUserData.getRawValue();
    console.warn(data)
    const valueForm = {
      email: data.email,
      password: data.password,
      profile: {
        firstName: data.profile.firstName,
        lastName: data.profile.lastName,
        age: data.profile.age,
        gender: data.profile.gender?.name,
        overview: data.profile.overview,
        degree: data.profile.degree?.id
      }
    }

    this.http.patch<User>(this.endPoint, cleanObject(valueForm)).subscribe(
      (value: User) => {
        this.userService.setUser(value);
        this.messageService.add({
          severity: "success",
          summary: "Éxito",
          detail: "Usuario Actualizado exitosamente",
        })
        setTimeout(() => {
          this.router.navigate(["/monitoring/profile"]);
        }, 2000);
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          detail: "Error al actualizar el perfil",
        })
      }
    )
  }
}
