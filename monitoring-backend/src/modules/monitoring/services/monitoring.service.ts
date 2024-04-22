import { ForbiddenError } from "@casl/ability";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Action } from "@src/modules/auth/authorization/actions";
import { AbilityService } from "@src/modules/auth/services/ability.service";
import { PAGINATION_LIMIT } from "@src/modules/common/constants/pagination";
import { DegreeSubject } from "@src/modules/degrees/entities/degree-subject.entity";
import { CreateMonitoringDto } from "@src/modules/monitoring/dto/monitoring/create-monitoring.dto";
import { FindAllMonitoringDto } from "@src/modules/monitoring/dto/monitoring/find-all-monitoring.dto";
import { UpdateMonitoringDto } from "@src/modules/monitoring/dto/monitoring/update-monitoring.dto";
import { MonitoringAgenda } from "@src/modules/monitoring/entities/monitoring-agenda.entity";
import { MonitoringAvailability } from "@src/modules/monitoring/entities/monitoring-availability.entity";
import { MonitoringSchedule } from "@src/modules/monitoring/entities/monitoring-schedule.entity";
import { Monitoring } from "@src/modules/monitoring/entities/monitoring.entity";
import { Request } from "express";
import { Repository } from "typeorm";

@Injectable()
export class MonitoringService {
  public constructor(
    @Inject(REQUEST)
    private request: Request,
    @InjectRepository(Monitoring)
    private monitoringRepository: Repository<Monitoring>,
    @InjectRepository(MonitoringAvailability)
    private monitoringAvailabilitiesRepository: Repository<MonitoringAvailability>,
    @InjectRepository(DegreeSubject)
    private degreeSubjectsRepository: Repository<DegreeSubject>,
    @InjectRepository(MonitoringSchedule)
    private monitoringSchedulesRepository: Repository<MonitoringSchedule>,
    @InjectRepository(MonitoringAgenda)
    private monitoringAgendasRepository: Repository<MonitoringAgenda>,
    private abilityService: AbilityService,
  ) {}

  /**
   * Creates a new monitoring.
   *
   * @param createMonitoringDto - The data for creating the monitoring.
   * @returns A Promise that resolves to the created monitoring.
   * @throws ForbiddenError If the user does not have permission to create a monitoring.
   * @throws NotFoundException If the degree subject specified in the createMonitoringDto is not found.
   */
  public async create(
    createMonitoringDto: CreateMonitoringDto,
  ): Promise<Monitoring> {
    // Check if the user has permission to create a monitoring
    const requestingUser = this.request.user!.entity;
    const userAbility = this.abilityService.grantAbility(requestingUser, {
      user: requestingUser,
    });

    ForbiddenError.from(userAbility).throwUnlessCan(
      Action.CREATE,
      "Monitoring",
    );

    // Check if the degree subject exists
    const degreeSubject = await this.degreeSubjectsRepository.findOne({
      where: { id: createMonitoringDto.subjectId },
    });

    if (!degreeSubject)
      throw new NotFoundException("Asignatura no encontrada.");

    // save just the first availability
    const [availability] = createMonitoringDto.availabilities;

    // Remove the authorizations from the user
    const { authorizations, ...rest } = requestingUser;

    // Save monitoring in database
    const monitoring = await this.monitoringRepository.save({
      title: createMonitoringDto.title,
      description: createMonitoringDto.description,
      maxAvailablePlaces: createMonitoringDto.maxAvailablePlaces,
      subject: degreeSubject,
      createdBy: rest,
    });

    // Save monitoring availability in database
    await this.monitoringAvailabilitiesRepository.save({
      type: availability.type,
      recurrence: availability.recurrence,
      monitoring,
    });

    return monitoring;
  }

  /**
   * Retrieves a list of monitoring records based on the provided criteria.
   *
   * @param findAllMonitoringDto - The DTO containing the criteria for filtering the monitoring records.
   * @returns A promise that resolves to an array of Monitoring objects.
   */
  public async findAll(
    findAllMonitoringDto: FindAllMonitoringDto,
  ): Promise<Monitoring[]> {
    const queryBuilder =
      this.monitoringRepository.createQueryBuilder("monitoring");

    // Inner join with createdBy and subject
    queryBuilder
      .innerJoinAndSelect("monitoring.createdBy", "createdBy")
      .innerJoinAndSelect("createdBy.profile", "profile")
      .innerJoinAndSelect("monitoring.subject", "subject")
      .innerJoinAndSelect("monitoring.availabilities", "availabilities");

    // Filter by keyword, title, description, createdBy, and subject
    if (findAllMonitoringDto.keyword) {
      queryBuilder.andWhere(
        "monitoring.title ILIKE :keyword OR monitoring.description ILIKE :keyword OR subject.name ILIKE :keyword OR profile.firstName ILIKE :keyword OR profile.lastName ILIKE :keyword",
        { keyword: `%${findAllMonitoringDto.keyword}%` },
      );
    }

    if (findAllMonitoringDto.title) {
      queryBuilder.andWhere("monitoring.title ILIKE :title", {
        title: `%${findAllMonitoringDto.title}%`,
      });
    }

    if (findAllMonitoringDto.description) {
      queryBuilder.andWhere("monitoring.description ILIKE :description", {
        description: `%${findAllMonitoringDto.description}%`,
      });
    }

    if (findAllMonitoringDto.createdBy) {
      queryBuilder.andWhere("monitoring.createdBy.id = :createdBy", {
        createdBy: findAllMonitoringDto.createdBy,
      });
    }

    if (findAllMonitoringDto.subject) {
      queryBuilder.andWhere("monitoring.subject.id = :subject", {
        subject: findAllMonitoringDto.subject,
      });
    }

    // Paginate the results
    queryBuilder
      .take(findAllMonitoringDto.limit ?? PAGINATION_LIMIT)
      .skip(findAllMonitoringDto.offset);

    return await queryBuilder.getMany();
  }

  /**
   * Finds a monitoring record by its ID.
   *
   * @param monitoringId - The ID of the monitoring record to find.
   * @returns A promise that resolves to the found monitoring record.
   * @throws NotFoundException if the monitoring record is not found.
   */
  public async findOne(monitoringId: string): Promise<Monitoring> {
    // Find the monitoring record
    const monitoring = await this.monitoringRepository.findOne({
      where: { id: monitoringId },
      relations: {
        createdBy: {
          profile: true,
        },
        subject: true,
        availabilities: true,
      },
    });

    if (!monitoring) throw new NotFoundException("Monitoria no encontrada.");

    return monitoring;
  }

  /**
   * Updates a monitoring record.
   *
   * @param monitoringId - The ID of the monitoring record to update.
   * @param updateMonitoringDto - The data to update the monitoring record with.
   * @returns A Promise that resolves to the updated Monitoring object.
   * @throws NotFoundException if the monitoring record is not found.
   */
  public async update(
    monitoringId: string,
    updateMonitoringDto: UpdateMonitoringDto,
  ): Promise<Monitoring> {
    // Check if the monitoring exists
    const monitoringToUpdate = await this.monitoringRepository.findOne({
      where: { id: monitoringId },
      relations: {
        createdBy: true, // Need to check if the requesting user is the creator
        subject: true,
      },
    });

    if (!monitoringToUpdate) {
      throw new NotFoundException("Monitoria no encontrada.");
    }

    // Check if the user has permission to update the monitoring
    const requestingUser = this.request.user!.entity;
    const userAbility = this.abilityService.grantAbility(requestingUser, {
      user: requestingUser,
    });

    ForbiddenError.from(userAbility).throwUnlessCan(
      Action.UPDATE,
      monitoringToUpdate,
    );

    // Merge the monitoring with the updated fields
    const monitoringToSave = this.monitoringRepository.merge(
      monitoringToUpdate,
      updateMonitoringDto,
    );

    // Check if the degree subject exists
    if (updateMonitoringDto.subjectId) {
      const subject = await this.degreeSubjectsRepository.findOne({
        where: { id: updateMonitoringDto.subjectId },
      });

      if (!subject) throw new NotFoundException("Asignatura no encontrada.");

      monitoringToUpdate.subject = subject;
    }

    // Save the updated monitoring
    return await this.monitoringRepository.save(monitoringToSave);
  }

  /**
   * Removes a monitoring by its ID.
   *
   * @param monitoringId - The ID of the monitoring to remove.
   * @throws NotFoundException If the monitoring is not found.
   * @throws ForbiddenError If the requesting user does not have permission to remove the monitoring.
   */
  public async remove(monitoringId: string): Promise<void> {
    // Check if the monitoring exists
    const monitoringToRemove = await this.monitoringRepository.findOne({
      where: { id: monitoringId },
      relations: { createdBy: true }, // Need to check if the requesting user is the creator
    });

    if (!monitoringToRemove) {
      throw new NotFoundException("Monitoria no encontrada.");
    }

    // Check if the user has permission to remove the monitoring
    const requestingUser = this.request.user!.entity;
    const userAbility = this.abilityService.grantAbility(requestingUser, {
      user: requestingUser,
    });

    ForbiddenError.from(userAbility).throwUnlessCan(
      Action.DELETE,
      monitoringToRemove,
    );

    // Find all schedules related to the monitoring
    const schedulesToRemove = await this.monitoringSchedulesRepository.find({
      where: { agenda: { monitoring: { id: monitoringToRemove.id } } },
    });

    const agendasToRemove = await this.monitoringAgendasRepository.find({
      where: { monitoring: { id: monitoringToRemove.id } },
    });

    // Soft remove the schedules
    await this.monitoringSchedulesRepository.softRemove(schedulesToRemove);

    // Soft remove the agendas
    await this.monitoringAgendasRepository.softRemove(agendasToRemove);

    // Soft remove the monitoring
    await this.monitoringRepository.softRemove(monitoringToRemove);
  }
}
