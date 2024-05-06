import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { setUpQueryParams } from "@src/app/modules/common/utils/set-up-query-params";
import { ScheduleMonitoringDto } from "@src/app/modules/monitoring/dto/schedule-monitoring.dto";
import { MonitoringSchedule } from "@src/app/modules/monitoring/entities/monitoring-schedule";
import { environment } from "@src/environments/environment";
import { Observable } from "rxjs";
import { FindAllMonitoringSchedule } from "../../dto/find-all-monitoring-schedule.dto";
import { UserService } from "@src/app/modules/common/services/user.service";

@Injectable({ providedIn: "root" })
export class MonitoringSchedulesService {
  public httpClient = inject(HttpClient);
  public userService = inject(UserService);

  public schedule(
    scheduleMonitoringDto: ScheduleMonitoringDto,
  ): Observable<void> {
    const endpoint = `${environment.API_URL}/monitoring-schedules`;
    return this.httpClient.post<void>(endpoint, scheduleMonitoringDto);
  }

  public findAll(
    findAllMonitoringScheduleDto: FindAllMonitoringSchedule,
  ): Observable<MonitoringSchedule[]> {
    const endpoint = `${environment.API_URL}/monitoring-schedules`;

    const params = setUpQueryParams({
      userId: this.userService.userId,
    });

    return this.httpClient.get<MonitoringSchedule[]>(endpoint, { params });
  }

  public unschedule(monitoringScheduleId: string): Observable<void> {
    const endpoint = `${environment.API_URL}/monitoring-schedules/${monitoringScheduleId}`;

    return this.httpClient.delete<void>(endpoint);
  }
}
