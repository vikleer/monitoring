import { ForbiddenError } from "@casl/ability";
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Action } from "@src/modules/auth/authorization/actions";
import { AbilityService } from "@src/modules/auth/services/ability.service";
import { ScheduleMonitoringDto } from "@src/modules/monitoring/dto/monitoring-agendas/schedule-monitoring-agenda.dto";
import { CreateMonitoringSchedulesDto } from "@src/modules/monitoring/dto/monitoring-schedules/create-monitoring-schedules.dto";
import { FindAllMonitoringSchedulesDto } from "@src/modules/monitoring/dto/monitoring-schedules/find-all-monitoring-schedules.dto";
import { MonitoringAgenda } from "@src/modules/monitoring/entities/monitoring-agenda.entity";
import { MonitoringSchedule } from "@src/modules/monitoring/entities/monitoring-schedule.entity";
import { Monitoring } from "@src/modules/monitoring/entities/monitoring.entity";
import { MonitoringAgendasService } from "@src/modules/monitoring/services/monitoring-agendas.service";
import { throwForbidden } from "@src/utils/throw-forbidden";
import { Request } from "express";
import { Repository } from "typeorm";

@Injectable()
export class MonitoringSchedulesService {
  public constructor(
    @Inject(REQUEST)
    private request: Request,
    @InjectRepository(MonitoringSchedule)
    private monitoringSchedulesRepository: Repository<MonitoringSchedule>,
    @InjectRepository(MonitoringAgenda)
    private monitoringAgendasRepository: Repository<MonitoringAgenda>,
    @InjectRepository(Monitoring)
    private monitoringRepository: Repository<Monitoring>,
    private monitoringAgendaService: MonitoringAgendasService,
    private abilityService: AbilityService,
  ) {}

  /**
   * Creates a new monitoring schedule.
   *
   * @param createMonitoringSchedulesDto - The data for creating the monitoring schedule.
   * @returns A promise that resolves to the created monitoring schedule.
   */
  public async create(
    createMonitoringSchedulesDto: CreateMonitoringSchedulesDto,
  ): Promise<MonitoringSchedule> {
    const monitoringSchedule = await this.monitoringSchedulesRepository.save({
      user: { id: createMonitoringSchedulesDto.userId },
      agenda: { id: createMonitoringSchedulesDto.agendaId },
    });

    return monitoringSchedule;
  }

  /**
   * Retrieves all monitoring schedules based on the provided DTO.
   *
   * @param findAllMonitoringSchedulesDto - The DTO containing the user ID to filter the monitoring schedules.
   * @returns A promise that resolves to an array of MonitoringSchedule objects.
   * @throws ForbiddenError if the requesting user is not authorized to access the monitoring schedules.
   */
  public async findAll(
    findAllMonitoringSchedulesDto: FindAllMonitoringSchedulesDto,
  ): Promise<MonitoringSchedule[]> {
    const monitoringSchedules = await this.monitoringSchedulesRepository.find({
      where: { user: { id: findAllMonitoringSchedulesDto.userId } },
      relations: {
        agenda: {
          monitoring: {
            subject: true,
            createdBy: {
              profile: true,
            },
          },
        },
        user: true,
      },
    });

    const requestingUser = this.request.user!.entity;
    const userAbility = this.abilityService.grantAbility(requestingUser, {
      user: requestingUser,
    });

    if (requestingUser.id !== findAllMonitoringSchedulesDto.userId) {
      throwForbidden();
    }

    monitoringSchedules.forEach((monitoringSchedule) => {
      ForbiddenError.from(userAbility).throwUnlessCan(
        Action.READ,
        monitoringSchedule,
      );
    });

    return monitoringSchedules;
  }

  /**
   * Schedules a monitoring session.
   *
   * @param scheduleMonitoringDto - The DTO containing the details of the monitoring session to be scheduled.
   * @throws ForbiddenError If the requesting user does not have permission to schedule monitoring.
   * @throws NotFoundException If the monitoring or monitoring agenda is not found.
   * @throws ConflictException If the requesting user tries to schedule their own monitoring, or if the monitoring agenda is already full.
   */
  public async schedule(
    scheduleMonitoringDto: ScheduleMonitoringDto,
  ): Promise<void> {
    // Check if user has permission to schedule monitoring
    const requestingUser = this.request.user!.entity;
    const userAbility = this.abilityService.grantAbility(requestingUser, {
      user: requestingUser,
    });

    ForbiddenError.from(userAbility).throwUnlessCan(
      Action.SCHEDULE,
      "MonitoringSchedule",
    );

    // Check if monitoring exists
    const monitoringToSchedule = await this.monitoringRepository.findOne({
      where: { id: scheduleMonitoringDto.monitoringId },
      relations: { subject: true, createdBy: true },
    });

    if (!monitoringToSchedule) {
      throw new NotFoundException("Monitoria no encontrada.");
    }

    // Check if monitoring agenda is valid
    const isValidAgenda = await this.monitoringAgendaService.isValidAgenda({
      monitoringId: monitoringToSchedule.id,
      startDate: scheduleMonitoringDto.startDate,
      endDate: scheduleMonitoringDto.endDate,
    });

    if (!isValidAgenda) {
      throw new NotFoundException("Agenda de monitoria no encontrada.");
    }

    // Check if monitoring agenda exists
    let monitoringAgenda = await this.monitoringAgendasRepository.findOne({
      where: {
        monitoring: { id: monitoringToSchedule.id },
        startDate: new Date(scheduleMonitoringDto.startDate),
        endDate: new Date(scheduleMonitoringDto.endDate),
      },
    });

    if (requestingUser.id === monitoringToSchedule.createdBy.id) {
      throw new ConflictException("No puede agendar su propia monitoria.");
    }

    // If monitoring agenda does not exist, create it
    if (!monitoringAgenda) {
      monitoringAgenda = await this.monitoringAgendasRepository.save({
        monitoring: monitoringToSchedule,
        startDate: new Date(scheduleMonitoringDto.startDate),
        endDate: new Date(scheduleMonitoringDto.endDate),
      });
    }

    // Check if user already scheduled this monitoring agenda
    const monitoringSchedule = await this.monitoringSchedulesRepository.findOne(
      {
        where: {
          user: { id: this.request.user!.entity.id },
          agenda: { id: monitoringAgenda.id },
        },
      },
    );

    // If user already scheduled this monitoring agenda, throw an error
    if (monitoringSchedule) {
      throw new ConflictException(
        "Ya ha agendado la monitoria para esta fecha.",
      );
    }

    if (
      monitoringAgenda.placesTaken >= monitoringToSchedule.maxAvailablePlaces
    ) {
      throw new ConflictException(
        "Las inscripciones para esta fecha están completas.",
      );
    }

    // Update monitoring agenda places taken
    monitoringAgenda.placesTaken += 1;
    await this.monitoringAgendasRepository.save(monitoringAgenda);

    // Create monitoring schedule
    await this.monitoringSchedulesRepository.save({
      user: { id: this.request.user!.entity.id },
      agenda: { id: monitoringAgenda.id },
    });
  }

  /**
   * Unschedules a monitoring schedule.
   *
   * @param scheduleId - The ID of the schedule to unschedule.
   * @throws NotFoundException If the schedule is not found.
   * @returns Promise<void> A promise that resolves when the schedule is unscheduled.
   */
  public async unschedule(scheduleId: string): Promise<void> {
    // Find the monitoring to unschedule
    const monitoringSchedule = await this.monitoringSchedulesRepository.findOne(
      {
        where: { id: scheduleId },
        relations: { agenda: true, user: true },
      },
    );

    if (!monitoringSchedule)
      throw new NotFoundException("Fecha de monitoria no encontrada.");

    // Check if the user has permission to unschedule the monitoring
    const requestingUser = this.request.user!.entity;
    const userAbility = this.abilityService.grantAbility(requestingUser, {
      user: requestingUser,
    });

    ForbiddenError.from(userAbility).throwUnlessCan(
      Action.UNSCHEDULE,
      monitoringSchedule,
    );

    // Remove the monitoring schedule
    await this.monitoringSchedulesRepository.softRemove(monitoringSchedule);

    // Update the monitoring agenda places taken
    monitoringSchedule.agenda.placesTaken -= 1;
    await this.monitoringAgendasRepository.save(monitoringSchedule.agenda);
  }
}
