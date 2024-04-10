import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "@src/modules/auth/guards/access-token.guard";
import { CreateMonitoringDto } from "@src/modules/monitoring/dto/monitoring/create-monitoring.dto";
import { FindAllMonitoringDto } from "@src/modules/monitoring/dto/monitoring/find-all-monitoring.dto";
import { UpdateMonitoringDto } from "@src/modules/monitoring/dto/monitoring/update-monitoring.dto";
import { Monitoring } from "@src/modules/monitoring/entities/monitoring.entity";
import { MonitoringService } from "@src/modules/monitoring/services/monitoring.service";

@ApiTags("Monitoring")
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller("monitoring")
export class MonitoringController {
  public constructor(private monitoringService: MonitoringService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() createMonitoringDto: CreateMonitoringDto,
  ): Promise<Monitoring> {
    return await this.monitoringService.create(createMonitoringDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(
    @Query() findAllMonitoringDto: FindAllMonitoringDto,
  ): Promise<Monitoring[]> {
    return await this.monitoringService.findAll(findAllMonitoringDto);
  }

  @Get(":monitoringId")
  @HttpCode(HttpStatus.OK)
  public async findOne(
    @Param("monitoringId") monitoringId: string,
  ): Promise<Monitoring> {
    return await this.monitoringService.findOne(monitoringId);
  }

  @Patch(":monitoringId")
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param("monitoringId") monitoringId: string,
    @Body() updateMonitoringDto: UpdateMonitoringDto,
  ): Promise<Monitoring> {
    return await this.monitoringService.update(
      monitoringId,
      updateMonitoringDto,
    );
  }

  @Delete(":monitoringId")
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(
    @Param("monitoringId") monitoringId: string,
  ): Promise<void> {
    return await this.monitoringService.remove(monitoringId);
  }
}
