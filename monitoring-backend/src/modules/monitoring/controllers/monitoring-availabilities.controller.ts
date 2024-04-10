import { Body, Controller, Param, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "@src/modules/auth/guards/access-token.guard";
import { UpdateMonitoringAvailabilityDto } from "@src/modules/monitoring/dto/monitoring-availabilities/update-monitoring-availability.dto";
import { MonitoringAvailability } from "@src/modules/monitoring/entities/monitoring-availability.entity";
import { MonitoringAvailabilitiesService } from "@src/modules/monitoring/services/monitoring-availabilities.service";

@ApiTags("Monitoring")
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller("monitoring-availabilities")
export class MonitoringAvailabilitiesController {
  public constructor(
    private monitoringAvailabilitiesService: MonitoringAvailabilitiesService,
  ) {}

  @Put(":monitoringAvailabilityId")
  public async update(
    @Param("monitoringAvailabilityId") monitoringAvailabilityId: string,
    @Body() updateMonitoringAvailabilityDto: UpdateMonitoringAvailabilityDto,
  ): Promise<MonitoringAvailability> {
    return await this.monitoringAvailabilitiesService.update(
      monitoringAvailabilityId,
      updateMonitoringAvailabilityDto,
    );
  }
}
