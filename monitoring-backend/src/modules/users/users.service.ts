import { ForbiddenError } from "@casl/ability";
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Action } from "@src/modules/auth/authorization/actions";
import { UserSession } from "@src/modules/auth/entities/user-session.entity";
import { AbilityService } from "@src/modules/auth/services/ability.service";
import { Degree } from "@src/modules/degrees/entities/degree.entity";
import { UpdateUserDto } from "@src/modules/users/dto/update-user.dto";
import { UserProfile } from "@src/modules/users/entities/user-profile.entity";
import { User } from "@src/modules/users/entities/user.entity";
import { hash } from "argon2";
import { Request } from "express";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  public constructor(
    @Inject(REQUEST)
    private request: Request,
    @InjectRepository(UserSession)
    private usersSessionRepository: Repository<UserSession>,
    @InjectRepository(UserProfile)
    private usersProfileRepository: Repository<UserProfile>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Degree)
    private degreesRepository: Repository<Degree>,
    private abilityService: AbilityService,
  ) {}

  /**
   * Finds a user by their ID.
   *
   * @param userId - The ID of the user to find.
   * @returns A Promise that resolves to the found user.
   * @throws BadRequestException if the user is not found.
   */
  public async findOne(userId: string): Promise<User> {
    // Find the user
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: {
        profile: {
          degree: true,
        },
        authorizations: {
          role: {
            permissions: true,
          },
        },
      },
    });

    if (!user) throw new BadRequestException("Usuario no encontrado.");

    // Check if the requesting user has the permission to read the user
    const requestingUser = this.request.user!.entity;
    const userAbility = this.abilityService.grantAbility(requestingUser, {
      user: requestingUser,
    });

    ForbiddenError.from(userAbility).throwUnlessCan(Action.READ, user);

    return user;
  }

  /**
   * Updates a user with the provided data.
   *
   * @param userId - The ID of the user to update.
   * @param updateUserDto - The data to update the user with.
   * @returns A Promise that resolves to the updated user.
   * @throws NotFoundException if the user to update is not found.
   * @throws ConflictException if the email is already in use by another user.
   * @throws NotFoundException if the degree specified in the profile is not found.
   */
  public async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    // Find the user to update
    const userToUpdate = await this.usersRepository.findOne({
      where: { id: userId },
      relations: {
        profile: {
          degree: true,
        },
        authorizations: {
          role: {
            permissions: true,
          },
        },
      },
    });

    if (!userToUpdate) throw new NotFoundException("Usuario no encontrado.");

    // Check if the requesting user has the permission to update the user
    const requestingUser = this.request.user!.entity;
    const userAbility = this.abilityService.grantAbility(requestingUser, {
      user: requestingUser,
    });

    ForbiddenError.from(userAbility).throwUnlessCan(
      Action.UPDATE,
      userToUpdate,
    );

    // Check if the email is already in use by another user
    if (updateUserDto.email) {
      const userWithSameEmail = await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      });

      // If the email is already in use by another user, throw an error
      if (userWithSameEmail && userWithSameEmail.id !== userToUpdate.id) {
        throw new ConflictException("El correo ya está en uso.");
      }
    }

    // Hash the password if it is provided
    if (updateUserDto.password) {
      updateUserDto.password = await hash(updateUserDto.password);
    }

    // Merge the user with the updated data
    const userToSave = this.usersRepository.merge(userToUpdate, updateUserDto);

    // Merge the user profile with the updated data
    if (updateUserDto.profile?.degreeId) {
      const degree = await this.degreesRepository.findOne({
        where: { id: updateUserDto.profile.degreeId },
      });

      if (!degree) throw new NotFoundException("Carrera no encontrada");

      userToSave.profile.degree = degree;
    }

    // Save the updated user and profile
    await this.usersRepository.save(userToSave);
    await this.usersProfileRepository.save(userToSave.profile);

    return userToSave;
  }

  /**
   * Removes a user and their associated profile and sessions.
   * Throws an error if the user is not found or if the requesting user does not have the permission to remove the user.
   *
   * @param userId - The ID of the user to remove.
   * @returns A Promise that resolves to void.
   * @throws BadRequestException if the user is not found.
   * @throws ForbiddenError if the requesting user does not have the permission to remove the user.
   */
  public async remove(userId: string): Promise<void> {
    // Find the user to remove
    const userToRemove = await this.usersRepository.findOne({
      where: { id: userId },
      relations: { sessions: true, profile: true },
    });

    if (!userToRemove) throw new BadRequestException("Usuario no encontrado.");

    // Check if the requesting user has the permission to remove the user
    const requestingUser = this.request.user!.entity;
    const userAbility = this.abilityService.grantAbility(requestingUser, {
      user: requestingUser,
    });

    ForbiddenError.from(userAbility).throwUnlessCan(
      Action.DELETE,
      userToRemove,
    );

    // Remove the user, their profile and their sessions
    await this.usersSessionRepository.softRemove(userToRemove.sessions);
    await this.usersProfileRepository.softRemove(userToRemove.profile);
    await this.usersRepository.softRemove(userToRemove);
  }
}
