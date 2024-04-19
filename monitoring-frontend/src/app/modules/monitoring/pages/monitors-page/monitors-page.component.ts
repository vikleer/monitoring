import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "@src/app/modules/common/components/footer/footer.component";
import { NavbarComponent } from "@src/app/modules/common/components/navbar/navbar.component";
import { MenuItem } from "primeng/api";
import { TabMenuModule } from "primeng/tabmenu";

@Component({
  selector: "app-monitors-page",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TabMenuModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: "./monitors-page.component.html",
  styleUrl: "./monitors-page.component.css",
})
export class MonitorsPageComponent implements OnInit {
  public items: MenuItem[] | undefined;

  public activeItem: MenuItem | undefined;

  public ngOnInit(): void {
    this.items = [
      {
        label: "Mis monitorias",
        icon: "pi pi-fw pi-calendar",
        routerLink: "/monitoring/monitors/my-monitoring",
      },
      {
        label: "Mi agenda",
        icon: "pi pi-fw pi-calendar",
        routerLink: "/monitoring/monitors/my-agenda",
      },
    ];

    this.activeItem = this.items[0];
  }

  public onActiveItemChange(event: MenuItem): void {
    this.activeItem = event;
  }
}
