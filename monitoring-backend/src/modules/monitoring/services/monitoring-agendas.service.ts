import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMonitoringAgendaDto } from "@src/modules/monitoring/dto/monitoring-agendas/create-monitoring-agenda.dto";
import { FindAllMonitoringAgendasDto } from "@src/modules/monitoring/dto/monitoring-agendas/find-all-monitoring-agendas.dto";
import { MonitoringAgenda } from "@src/modules/monitoring/entities/monitoring-agenda.entity";
import { MonitoringAvailability } from "@src/modules/monitoring/entities/monitoring-availability.entity";
import { Monitoring } from "@src/modules/monitoring/entities/monitoring.entity";
import { DateRange } from "@src/modules/monitoring/types/dates";
import {
  createDateFromDateTime,
  createDateFromMonthDayTime,
  createDateFromWeekDayTime,
} from "@src/utils/create-date";
import { parseISO } from "date-fns";
import { In, Repository } from "typeorm";
import { FindCreatedMonitoringAgendasDto } from "../dto/monitoring-agendas/find-created-monitoring.dto";

@Injectable()
export class MonitoringAgendasService {
  public constructor(
    @InjectRepository(MonitoringAgenda)
    private monitoringAgendasRepository: Repository<MonitoringAgenda>,
    @InjectRepository(Monitoring)
    private monitoringRepository: Repository<Monitoring>,
    @InjectRepository(MonitoringAvailability)
    private monitoringAvailabilitiesRepository: Repository<MonitoringAvailability>,
  ) {}

  /**
   * Creates a new monitoring agenda.
   *
   * @param createMonitoringAgendaDto - The data for creating the monitoring agenda.
   * @returns A promise that resolves to the created monitoring agenda.
   * @throws `NotFoundException` if the monitoring with the specified ID is not found.
   */
  public async create(
    createMonitoringAgendaDto: CreateMonitoringAgendaDto,
  ): Promise<MonitoringAgenda> {
    // Find the monitoring based on the provided ID.
    const monitoring = await this.monitoringRepository.findOne({
      where: { id: createMonitoringAgendaDto.monitoringId },
      relations: { subject: true, createdBy: true },
    });

    if (!monitoring) throw new NotFoundException("Monitoria no encontrada.");

    // Create the monitoring agenda.
    const monitoringAgenda = await this.monitoringAgendasRepository.save({
      monitoring: { id: createMonitoringAgendaDto.monitoringId },
      startDate: new Date(createMonitoringAgendaDto.startDate),
      endDate: new Date(createMonitoringAgendaDto.endDate),
      placesTaken: 0,
    });

    return monitoringAgenda;
  }

  /**
   * Retrieves all monitoring agendas based on the provided criteria.
   *
   * @param findAllMonitoringAgendasDto - The DTO containing the criteria for finding monitoring agendas.
   * @returns A promise that resolves to an array of MonitoringAgenda objects.
   */
  public async findAll(
    findAllMonitoringAgendasDto: FindAllMonitoringAgendasDto,
  ): Promise<MonitoringAgenda[]> {
    // Calculate the monitoring agendas based on the provided criteria.
    const monitoringAgendasDateRanges = await this.calculateMonitoringAgendas(
      findAllMonitoringAgendasDto,
    );

    // Find the monitoring agendas based on the calculated date ranges.
    const foundMonitoringAgendas = await this.monitoringAgendasRepository.find({
      where: {
        monitoring: {
          id: findAllMonitoringAgendasDto.monitoringId,
        },
        startDate: In(
          monitoringAgendasDateRanges.map((dateRange) => dateRange.startDate),
        ),
      },
    });

    // Create the monitoring agendas if they don't exist.
    const monitoringAgendas = monitoringAgendasDateRanges.map(
      (agendaDateRange) => {
        const agenda = foundMonitoringAgendas.find(
          (agenda) =>
            agenda.startDate.getTime() === agendaDateRange.startDate.getTime(),
        );

        if (!agenda)
          return this.monitoringAgendasRepository.create({
            startDate: agendaDateRange.startDate,
            endDate: agendaDateRange.endDate,
            placesTaken: 0,
          });

        return agenda;
      },
    );

    return monitoringAgendas;
  }

  public async findCreated(
    findCreatedMonitoringAgendasDto: FindCreatedMonitoringAgendasDto,
  ): Promise<MonitoringAgenda[]> {
    const queryBuilder = this.monitoringAgendasRepository
      .createQueryBuilder("monitoringAgenda")
      .innerJoinAndSelect("monitoringAgenda.monitoring", "monitoring")
      .innerJoinAndSelect("monitoring.subject", "subject")
      .innerJoinAndSelect("monitoring.createdBy", "createdBy")
      .innerJoinAndSelect("monitoring.availabilities", "availabilities");

    if (findCreatedMonitoringAgendasDto.createdById) {
      queryBuilder.where("createdBy.id = :createdById", {
        createdById: findCreatedMonitoringAgendasDto.createdById,
      });
    }

    const monitoringAgendas = await queryBuilder.getMany();

    return monitoringAgendas;
  }

  /**
   * Calculates the monitoring agendas based on the provided parameters.
   *
   * @param findAllMonitoringAgendasDto - The DTO containing the parameters for finding monitoring agendas.
   * @returns An array of DateRange objects representing the calculated monitoring agendas.
   */
  public async calculateMonitoringAgendas(
    findAllMonitoringAgendasDto: FindAllMonitoringAgendasDto,
  ): Promise<DateRange[]> {
    // Find the monitoring availabilities based on the provided monitoring ID.
    const monitoringAvailabilities =
      await this.monitoringAvailabilitiesRepository.find({
        where: { monitoring: { id: findAllMonitoringAgendasDto.monitoringId } },
      });

    const monitoringAgendasDateRanges: DateRange[] = [];

    // Calculate the monitoring agendas based on the recurrence type.
    monitoringAvailabilities.forEach((availability) => {
      if (availability.recurrence.type === "unique") {
        availability.recurrence.dates.forEach((date) => {
          const agendas = createDateFromDateTime(date);
          monitoringAgendasDateRanges.push(agendas);
        });
      }

      if (availability.recurrence.type === "weekly") {
        availability.recurrence.weekDays.forEach((weekDay) => {
          const agendas = createDateFromWeekDayTime(weekDay, {
            start: parseISO(findAllMonitoringAgendasDto.startDate),
            end: parseISO(findAllMonitoringAgendasDto.endDate),
          });

          monitoringAgendasDateRanges.push(...agendas);
        });
      }

      if (availability.recurrence.type === "monthly") {
        availability.recurrence.monthDays.forEach((monthDay) => {
          const agendas = createDateFromMonthDayTime(monthDay, {
            start: new Date(findAllMonitoringAgendasDto.startDate),
            end: new Date(findAllMonitoringAgendasDto.endDate),
          });

          monitoringAgendasDateRanges.push(...agendas);
        });
      }
    });

    return monitoringAgendasDateRanges;
  }

  /**
   * Checks if the provided monitoring agenda is valid.
   *
   * @param findAllMonitoringAgendasDto - The DTO containing the monitoring agenda details.
   * @returns A boolean indicating whether the monitoring agenda is valid or not.
   */
  public async isValidAgenda(
    findAllMonitoringAgendasDto: FindAllMonitoringAgendasDto,
  ): Promise<boolean> {
    // Calculate the monitoring agendas based on the provided criteria.
    const monitoringAgendasDateRanges = await this.calculateMonitoringAgendas({
      monitoringId: findAllMonitoringAgendasDto.monitoringId,
      startDate: findAllMonitoringAgendasDto.startDate,
      endDate: findAllMonitoringAgendasDto.endDate,
    });

    // Check if the provided monitoring agenda is valid.
    const isValidAgenda = monitoringAgendasDateRanges.some((agenda) => {
      return (
        agenda.startDate.getTime() ===
          new Date(findAllMonitoringAgendasDto.startDate).getTime() &&
        agenda.endDate.getTime() ===
          new Date(findAllMonitoringAgendasDto.endDate).getTime()
      );
    });

    return isValidAgenda;
  }
}
