import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Degree } from "@src/modules/degrees/entities/degree.entity";
import { Repository } from "typeorm";

@Injectable()
export class DegreesService {
  public constructor(
    @InjectRepository(Degree)
    private degreesRepository: Repository<Degree>,
  ) {}

  /**
   * Retrieves all degrees.
   *
   * @returns A promise that resolves to an array of Degree objects.
   */
  public async findAll(): Promise<Degree[]> {
    return await this.degreesRepository.find();
  }
}
