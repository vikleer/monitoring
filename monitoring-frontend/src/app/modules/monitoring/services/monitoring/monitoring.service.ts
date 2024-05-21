import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { setUpQueryParams } from "@src/app/modules/common/utils/set-up-query-params";
import { Monitoring } from "@src/app/modules/monitoring/entities/monitoring";
import { FindAllMonitoringDto } from "@src/app/modules/monitoring/dto/find-all-monitoring.dto";
import { environment } from "@src/environments/environment";
import { Observable } from "rxjs";
import { CreateMonitoringDto } from "@src/app/modules/monitoring/dto/create-monitoring.dto";
import { UpdateMonitoringDto } from "@src/app/modules/monitoring/dto/update-monitoring.dto";

@Injectable({ providedIn: "root", useClass: MonitoringService })
export class MonitoringService {
  public httpClient = inject(HttpClient);

  public create(
    createMonitoringDto: CreateMonitoringDto,
  ): Observable<Monitoring> {
    const endpoint = `${environment.API_URL}/monitoring`;

    return this.httpClient.post<Monitoring>(endpoint, createMonitoringDto);
  }

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

  public update(
    monitoringId: string,
    updateMonitoringDto: UpdateMonitoringDto,
  ): Observable<Monitoring> {
    const endpoint = `${environment.API_URL}/monitoring/${monitoringId}`;

    return this.httpClient.patch<Monitoring>(endpoint, updateMonitoringDto);
  }

  public remove(monitoringId: string): Observable<void> {
    const endpoint = `${environment.API_URL}/monitoring/${monitoringId}`;

    return this.httpClient.delete<void>(endpoint);
  }
}