import { Controller, Get, HttpCode, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "@src/modules/auth/guards/access-token.guard";
import { DegreeSubject } from "@src/modules/degrees/entities/degree-subject.entity";
import { DegreeSubjectsService } from "@src/modules/degrees/services/degree-subjects.service";

@ApiTags("Degrees")
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller("degree-subjects")
export class DegreeSubjectsController {
  public constructor(
    private readonly degreeSubjectsService: DegreeSubjectsService,
  ) {}

  @Get()
  @HttpCode(200)
  public async findAll(): Promise<DegreeSubject[]> {
    return await this.degreeSubjectsService.findAll();
  }

  @Get(":subjectId")
  @HttpCode(200)
  public async findOne(
    @Param("subjectId") subjectId: string,
  ): Promise<DegreeSubject> {
    const subject = await this.degreeSubjectsService.findOne(subjectId);
    return subject;
  }
}
