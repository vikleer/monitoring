import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DegreeSubject } from "@src/modules/degrees/entities/degree-subject.entity";
import { Repository } from "typeorm";

@Injectable()
export class DegreeSubjectsService {
  public constructor(
    @InjectRepository(DegreeSubject)
    private degreeSubjectRepository: Repository<DegreeSubject>,
  ) {}

  /**
   * Retrieves all degree subjects.
   * @returns A promise that resolves to an array of DegreeSubject objects.
   */
  public async findAll(): Promise<DegreeSubject[]> {
    return await this.degreeSubjectRepository.find();
  }

  /**
   * Finds a degree subject by its ID.
   *
   * @param subjectId - The ID of the subject to find.
   * @returns A promise that resolves to the found degree subject.
   * @throws NotFoundException if the subject is not found.
   */
  public async findOne(subjectId: string): Promise<DegreeSubject> {
    // Find the subject based on the provided ID.
    const subject = await this.degreeSubjectRepository.findOne({
      where: { id: subjectId },
    });

    if (!subject) throw new NotFoundException("Subject not found");

    return subject;
  }
}
