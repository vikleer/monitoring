import { inject } from "@angular/core";
import type { ResolveFn } from "@angular/router";
import { Monitoring } from "@src/app/modules/monitoring/entities/monitoring";
import { MonitoringService } from "@src/app/modules/monitoring/services/monitoring/monitoring.service";

export const monitoringResolver: ResolveFn<Monitoring> = (route, state) => {
  const monitoringService = inject(MonitoringService);

  return monitoringService.findOne(route.paramMap.get("id")!);
};
