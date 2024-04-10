import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DegreeSubjectsController } from "@src/modules/degrees/controllers/degree-subjects.controller";
import { DegreesController } from "@src/modules/degrees/controllers/degrees.controller";
import { AcademicProgram } from "@src/modules/degrees/entities/academic-program.entity";
import { DegreeSubject } from "@src/modules/degrees/entities/degree-subject.entity";
import { Degree } from "@src/modules/degrees/entities/degree.entity";
import { DegreeSubjectsService } from "@src/modules/degrees/services/degree-subjects.service";
import { DegreesService } from "@src/modules/degrees/services/degrees.service";

@Module({
  imports: [TypeOrmModule.forFeature([Degree, DegreeSubject, AcademicProgram])],
  controllers: [DegreesController, DegreeSubjectsController],
  providers: [DegreesService, DegreeSubjectsService],
  exports: [DegreesService, DegreeSubjectsService],
})
export class DegreesModule {}
