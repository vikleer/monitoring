import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { setUpQueryParams } from "@src/app/modules/common/utils/set-up-query-params";
import { Monitoring } from "@src/app/modules/monitoring/entities/monitoring";
import { FindAllMonitoringDto } from "@src/app/modules/monitoring/dto/find-all-monitoring.dto";
import { environment } from "@src/environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root", useClass: MonitoringService })
export class MonitoringService {
  public httpClient = inject(HttpClient);

  public findAll(
    findAllMonitoringDto?: FindAllMonitoringDto,
  ): Observable<Monitoring[]> {
    const endpoint = `${environment.API_URL}/monitoring`;

    const params = setUpQueryParams(findAllMonitoringDto);

    return this.httpClient.get<Monitoring[]>(endpoint, {
      params,
    });
  }

  public findOne(id: string): Observable<Monitoring> {
    const endpoint = `${environment.API_URL}/monitoring/${id}`;

    return this.httpClient.get<Monitoring>(endpoint);
  }
}
