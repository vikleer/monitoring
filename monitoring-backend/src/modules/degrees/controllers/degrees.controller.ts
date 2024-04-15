import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Degree } from "@src/modules/degrees/entities/degree.entity";
import { DegreesService } from "@src/modules/degrees/services/degrees.service";

@ApiTags("Degrees")
@Controller("degrees")
export class DegreesController {
  public constructor(private degreesService: DegreesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<Degree[]> {
    return await this.degreesService.findAll();
  }
}
