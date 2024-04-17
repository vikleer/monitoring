import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";

@Component({
  selector: "app-my-monitoring-page",
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  templateUrl: "./my-monitoring-page.component.html",
  styleUrl: "./my-monitoring-page.component.css",
})
export class MyMonitoringPageComponent {}
