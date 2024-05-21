import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { UserService } from "@src/app/modules/common/services/user.service";
import { ButtonModule } from "primeng/button";
import { SidebarModule } from "primeng/sidebar";
import { TooltipModule } from "primeng/tooltip";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    TooltipModule,
    SidebarModule,
  ],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
  public router = inject(Router);
  public userService = inject(UserService);

  public isSidebarOpen = false;

  public links: { label: string; path: string; exact: boolean }[] = [
    { label: "Inicio", path: "/monitoring/home", exact: false},
    { label: "Monitorias", path: "/monitoring", exact: true },
    { label: "Estudiante", path: "/monitoring/students", exact: false },
    { label: "Monitor", path: "/monitoring/monitors", exact: false },
  ];

  public openSidebar(): void {
    this.isSidebarOpen = true;
  }

  public logout(): void {
    this.userService.logout();
    this.router.navigate(["/login"]);
  }

  public get userName(): string {
    const { firstName, lastName } = this.userService.user!.profile;
    return `${firstName} ${lastName}`;
  }

  public profile(): void {
    this.router.navigate(["/profile"]);
  }
}
