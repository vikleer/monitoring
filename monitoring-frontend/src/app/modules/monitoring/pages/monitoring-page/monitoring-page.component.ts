import { CommonModule } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
import { Monitoring } from "@src/app/modules/monitoring/entities/monitoring";
import { MonitoringService } from "@src/app/modules/monitoring/services/monitoring-service/monitoring.service";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "@src/app/modules/common/components/navbar/navbar.component";

@Component({
  selector: "app-monitoring-page",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    NavbarComponent,
  ],
  templateUrl: "./monitoring-page.component.html",
  styleUrls: ["./monitoring-page.components.css"],
})
export class MonitoringPageComponent implements OnInit {
  public monitoringService = inject(MonitoringService);

  public monitoring: Monitoring[] = [];

  public ngOnInit(): void {
    this.monitoringService.findAll().subscribe((monitoring) => {
      this.monitoring = monitoring;
    });
  }
}
