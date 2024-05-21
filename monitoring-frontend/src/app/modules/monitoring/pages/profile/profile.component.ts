import { Component, inject } from '@angular/core';
import { NavbarComponent } from '@src/app/modules/common/components/navbar/navbar.component';
import { ButtonModule } from "primeng/button";
import { UserService } from '../../../common/services/user.service';
import { Profile, User } from '@src/app/modules/common/types/user.type';
import { Router } from '@angular/router';
import { FooterComponent } from '@src/app/modules/common/components/footer/footer.component';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NavbarComponent,
    ButtonModule,
    FooterComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  public userService = inject(UserService)
  private route = inject(Router)

  public ngOnInit(): void {
    this.userService

    this.profile
    this.dataProfile
    this.gender

  }


  public get profile(): Profile {
    const data:Profile = this.userService.user!.profile;
    return data ;
  }

  public get dataProfile(): User | null {
    const data: User | null = this.userService.user
    return data;
  }

  public get gender(): string {
    const data = this.userService.user?.profile.gender;
    return data!;
  }

  public onClick() {
    this.route.navigate(['monitoring/edit-profile'])
  }
}
