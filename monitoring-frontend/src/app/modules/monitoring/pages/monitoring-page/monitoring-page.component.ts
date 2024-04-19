import { CommonModule } from "@angular/common";
import { Component, inject, type OnInit } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "@src/app/modules/common/components/footer/footer.component";
import { NavbarComponent } from "@src/app/modules/common/components/navbar/navbar.component";
import { Monitoring } from "@src/app/modules/monitoring/entities/monitoring";
import { MonitoringService } from "@src/app/modules/monitoring/services/monitoring/monitoring.service";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { debounceTime } from "rxjs";

@Component({
  selector: "app-monitoring-page",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: "./monitoring-page.component.html",
  styleUrls: ["./monitoring-page.components.css"],
})
export class MonitoringPageComponent implements OnInit {
  public monitoringService = inject(MonitoringService);

  public searchControl = new FormControl("", { nonNullable: true });
  public monitoring: Monitoring[] = [];

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(800))
      .subscribe((search) => {
        this.monitoringService
          .findAll({ keyword: search })
          .subscribe((monitoring) => {
            this.monitoring = monitoring;
          });
      });

    this.monitoringService.findAll().subscribe((monitoring) => {
      this.monitoring = monitoring;
    });
  }
}
