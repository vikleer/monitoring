import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavbarComponent } from "@src/app/modules/common/components/navbar/navbar.component";

@Component({
  selector: "app-monitoring-detail-page",
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: "./monitoring-detail-page.component.html",
  styleUrl: "./monitoring-detail-page.component.css",
})
export class MonitoringDetailPageComponent {
  public activatedRoute = inject(ActivatedRoute);

  public monitoringId: string | null;

  public constructor() {
    this.monitoringId = this.activatedRoute.snapshot.paramMap.get("id");
  }
}
