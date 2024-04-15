import { Injectable } from "@angular/core";
import { Monitoring } from "@src/app/modules/monitoring/entities/monitoring";
import { generateFakeMonitoring } from "@src/app/modules/monitoring/fakers/generate-fake-monitoring";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class MockMonitoringService {
  public findAll(): Observable<Monitoring[]> {
    const monitoring: Monitoring[] = [];

    for (let i = 0; i < 10; i++) {
      monitoring.push(generateFakeMonitoring());
    }

    return of(monitoring);
  }
}
