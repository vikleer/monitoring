import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Monitoring } from "@src/app/modules/monitoring/entities/monitoring";
import { MockMonitoringService } from "@src/app/modules/monitoring/services/monitoring-service/mock-monitoring.service";
import { environment } from "@src/environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root", useClass: MonitoringService })
export class MonitoringService {
  public httpClient = inject(HttpClient);

  public findAll(): Observable<Monitoring[]> {
    const endpoint = `${environment.API_URL}/monitoring`;
    return this.httpClient.get<Monitoring[]>(endpoint);
  }
}
