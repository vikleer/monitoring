import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "@src/modules/auth/guards/access-token.guard";
import { FindAllMonitoringAgendasDto } from "@src/modules/monitoring/dto/monitoring-agendas/find-all-monitoring-agendas.dto";
import { MonitoringAgenda } from "@src/modules/monitoring/entities/monitoring-agenda.entity";
import { MonitoringAgendasService } from "@src/modules/monitoring/services/monitoring-agendas.service";
import { FindCreatedMonitoringAgendasDto } from "../dto/monitoring-agendas/find-created-monitoring.dto";

@ApiTags("Monitoring")
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller("monitoring-agendas")
export class MonitoringAgendasController {
  public constructor(
    private monitoringAgendasService: MonitoringAgendasService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(
    @Query() findAllMonitoringAgendasDto: FindAllMonitoringAgendasDto,
  ): Promise<MonitoringAgenda[]> {
    return await this.monitoringAgendasService.findAll(
      findAllMonitoringAgendasDto,
    );
  }

  @Get("created")
  @HttpCode(HttpStatus.OK)
  public async findCreated(
    @Query() findCreatedMonitoringAgendasDto: FindCreatedMonitoringAgendasDto,
  ): Promise<MonitoringAgenda[]> {
    return await this.monitoringAgendasService.findCreated(
      findCreatedMonitoringAgendasDto,
    );
  }
}
