import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
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
  public isSidebarOpen = false;

  public links: { label: string; path: string; exact: boolean }[] = [
    { label: "Monitorias", path: "/monitoring", exact: true },
    { label: "Estudiante", path: "/monitoring/students", exact: false },
    { label: "Monitor", path: "/monitoring/monitors", exact: false },
  ];

  public openSidebar(): void {
    this.isSidebarOpen = true;
  }
}
