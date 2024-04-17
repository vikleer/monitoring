import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { MonitoringAgenda } from "@src/app/modules/monitoring/entities/monitoring-agenda";
import { FindAllMonitoringAgendaDto } from "@src/app/modules/monitoring/dto/find-all-monitoring-agenda.dto";
import { environment } from "@src/environments/environment";
import { Observable } from "rxjs";
import { setUpQueryParams } from "@src/app/modules/common/utils/set-up-query-params";

@Injectable({ providedIn: "root" })
export class MonitoringAgendasService {
  public httpClient = inject(HttpClient);

  public findAll(
    findAllMonitoringAgenda: FindAllMonitoringAgendaDto,
  ): Observable<MonitoringAgenda[]> {
    const endpoint = `${environment.API_URL}/monitoring-agendas`;

    const params = setUpQueryParams(findAllMonitoringAgenda);

    return this.httpClient.get<MonitoringAgenda[]>(endpoint, { params });
  }
}
