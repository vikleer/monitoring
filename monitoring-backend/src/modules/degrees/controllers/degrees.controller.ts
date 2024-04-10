import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "@src/modules/auth/guards/access-token.guard";
import { Degree } from "@src/modules/degrees/entities/degree.entity";
import { DegreesService } from "@src/modules/degrees/services/degrees.service";

@ApiTags("Degrees")
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller("degrees")
export class DegreesController {
  public constructor(private degreesService: DegreesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<Degree[]> {
    return await this.degreesService.findAll();
  }
}
