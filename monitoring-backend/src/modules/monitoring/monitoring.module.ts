import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "@src/modules/auth/auth.module";
import { DegreesModule } from "@src/modules/degrees/degrees.module";
import { DegreeSubject } from "@src/modules/degrees/entities/degree-subject.entity";
import { MonitoringAgendasController } from "@src/modules/monitoring/controllers/monitoring-agendaS.controller";
import { MonitoringAvailabilitiesController } from "@src/modules/monitoring/controllers/monitoring-availabilities.controller";
import { MonitoringSchedulesController } from "@src/modules/monitoring/controllers/monitoring-schedules.controller";
import { MonitoringController } from "@src/modules/monitoring/controllers/monitoring.controller";
import { MonitoringAgenda } from "@src/modules/monitoring/entities/monitoring-agenda.entity";
import { MonitoringAvailability } from "@src/modules/monitoring/entities/monitoring-availability.entity";
import { MonitoringSchedule } from "@src/modules/monitoring/entities/monitoring-schedule.entity";
import { Monitoring } from "@src/modules/monitoring/entities/monitoring.entity";
import { MonitoringAgendasService } from "@src/modules/monitoring/services/monitoring-agendas.service";
import { MonitoringAvailabilitiesService } from "@src/modules/monitoring/services/monitoring-availabilities.service";
import { MonitoringSchedulesService } from "@src/modules/monitoring/services/monitoring-schedules.service";
import { MonitoringService } from "@src/modules/monitoring/services/monitoring.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Monitoring,
      MonitoringAgenda,
      MonitoringAvailability,
      MonitoringSchedule,
      DegreeSubject,
    ]),
    AuthModule,
    DegreesModule,
  ],
  controllers: [
    MonitoringController,
    MonitoringAgendasController,
    MonitoringAvailabilitiesController,
    MonitoringSchedulesController,
  ],
  providers: [
    MonitoringService,
    MonitoringAgendasService,
    MonitoringAvailabilitiesService,
    MonitoringSchedulesService,
    MonitoringSchedulesService,
  ],
  exports: [
    MonitoringService,
    MonitoringAgendasService,
    MonitoringAvailabilitiesService,
    MonitoringSchedulesService,
  ],
})
export class MonitoringModule {}
