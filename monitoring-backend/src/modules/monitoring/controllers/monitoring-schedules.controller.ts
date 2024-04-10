import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "@src/modules/auth/guards/access-token.guard";
import { ScheduleMonitoringDto } from "@src/modules/monitoring/dto/monitoring-agendas/schedule-monitoring-agenda.dto";
import { FindAllMonitoringSchedulesDto } from "@src/modules/monitoring/dto/monitoring-schedules/find-all-monitoring-schedules.dto";
import { MonitoringSchedule } from "@src/modules/monitoring/entities/monitoring-schedule.entity";
import { MonitoringSchedulesService } from "@src/modules/monitoring/services/monitoring-schedules.service";

@ApiTags("Monitoring")
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller("monitoring-schedules")
export class MonitoringSchedulesController {
  public constructor(
    private monitoringSchedulesService: MonitoringSchedulesService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(
    @Query() findAllMonitoringSchedulesDto: FindAllMonitoringSchedulesDto,
  ): Promise<MonitoringSchedule[]> {
    return this.monitoringSchedulesService.findAll(
      findAllMonitoringSchedulesDto,
    );
  }

  @Post("")
  @HttpCode(HttpStatus.CREATED)
  public async schedule(
    @Body() scheduleMonitoringDto: ScheduleMonitoringDto,
  ): Promise<void> {
    await this.monitoringSchedulesService.schedule(scheduleMonitoringDto);
  }

  @Delete(":scheduleId")
  @HttpCode(HttpStatus.NO_CONTENT)
  public async unschedule(
    @Param("scheduleId") scheduleId: string,
  ): Promise<void> {
    await this.monitoringSchedulesService.unschedule(scheduleId);
  }
}
