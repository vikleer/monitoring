import { ForbiddenError } from "@casl/ability";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Action } from "@src/modules/auth/authorization/actions";
import { AbilityService } from "@src/modules/auth/services/ability.service";
import { CreateMonitoringAvailabilityDto } from "@src/modules/monitoring/dto/monitoring-availabilities/create-monitoring-availability.dto";
import { FindAllMonitoringAvailabilitiesDto } from "@src/modules/monitoring/dto/monitoring-availabilities/find-all-monitoring-availabilities.dto";
import { UpdateMonitoringAvailabilityDto } from "@src/modules/monitoring/dto/monitoring-availabilities/update-monitoring-availability.dto";
import { MonitoringAvailability } from "@src/modules/monitoring/entities/monitoring-availability.entity";
import { Monitoring } from "@src/modules/monitoring/entities/monitoring.entity";
import { Request } from "express";
import { Repository } from "typeorm";

@Injectable()
export class MonitoringAvailabilitiesService {
  public constructor(
    @Inject(REQUEST)
    private request: Request,
    @InjectRepository(MonitoringAvailability)
    private monitoringAvailabilityRepository: Repository<MonitoringAvailability>,
    private abilityService: AbilityService,
  ) {}

  /**
   * Creates a new monitoring availability.
   *
   * @param createMonitoringAvailabilityDto - The DTO containing the data for creating a monitoring availability.
   * @param monitoring - The monitoring object associated with the availability.
   * @returns A promise that resolves to the created monitoring availability.
   */
  public async create(
    createMonitoringAvailabilityDto: CreateMonitoringAvailabilityDto,
    monitoring: Monitoring,
  ): Promise<MonitoringAvailability> {
    return await this.monitoringAvailabilityRepository.save({
      type: createMonitoringAvailabilityDto.type,
      recurrence: createMonitoringAvailabilityDto.recurrence,
      monitoring,
    });
  }

  /**
   * Creates multiple monitoring availabilities.
   *
   * @param createMonitoringAvailabilityDto - An array of objects containing the data for creating monitoring availabilities.
   * @param monitoring - The monitoring object to associate the availabilities with.
   * @returns A promise that resolves to an array of created monitoring availabilities.
   */
  public async createMany(
    createMonitoringAvailabilityDto: CreateMonitoringAvailabilityDto[],
    monitoring: Monitoring,
  ): Promise<MonitoringAvailability[]> {
    const monitoringAvailabilities = createMonitoringAvailabilityDto.map(
      (createAvailabilityDto) =>
        this.monitoringAvailabilityRepository.create({
          type: createAvailabilityDto.type,
          monitoring,
          recurrence: createAvailabilityDto.recurrence,
        }),
    );

    return await this.monitoringAvailabilityRepository.save(
      monitoringAvailabilities,
    );
  }

  /**
   * Retrieves all monitoring availabilities based on the provided DTO.
   *
   * @param findAllMonitoringAvailabilitiesDto - The DTO containing the monitoring ID.
   * @returns A promise that resolves to an array of MonitoringAvailability objects.
   */
  public async findAll(
    findAllMonitoringAvailabilitiesDto: FindAllMonitoringAvailabilitiesDto,
  ): Promise<MonitoringAvailability[]> {
    const availabilities = await this.monitoringAvailabilityRepository.find({
      where: {
        monitoring: { id: findAllMonitoringAvailabilitiesDto.monitoringId },
      },
    });

    return availabilities;
  }

  /**
   * Updates a monitoring availability.
   *
   * @param monitoringAvailabilityId - The ID of the monitoring availability to update.
   * @param updateMonitoringAvailabilityDto - The DTO containing the updated data for the monitoring availability.
   * @returns A Promise that resolves to the updated MonitoringAvailability object.
   * @throws NotFoundException if the monitoring availability is not found.
   */
  public async update(
    monitoringAvailabilityId: string,
    updateMonitoringAvailabilityDto: UpdateMonitoringAvailabilityDto,
  ): Promise<MonitoringAvailability> {
    // Find the availability to update
    const monitoringAvailability =
      await this.monitoringAvailabilityRepository.findOne({
        where: { id: monitoringAvailabilityId },
        relations: {
          monitoring: {
            createdBy: true, //  Required to check if the requesting user is the creator
          },
        },
      });

    if (!monitoringAvailability) {
      throw new NotFoundException("Disponibilidad no encontrada.");
    }

    // Check if the requesting user can update the availability
    const requestingUser = this.request.user!.entity;
    const userAbility = this.abilityService.grantAbility(requestingUser, {
      user: requestingUser,
    });

    ForbiddenError.from(userAbility).throwUnlessCan(
      Action.UPDATE,
      monitoringAvailability,
    );

    // Merge the availability with the new data
    const availabilityToSave = this.monitoringAvailabilityRepository.merge(
      monitoringAvailability,
      updateMonitoringAvailabilityDto,
    );

    // Save the updated availability
    return await this.monitoringAvailabilityRepository.save(availabilityToSave);
  }
}
