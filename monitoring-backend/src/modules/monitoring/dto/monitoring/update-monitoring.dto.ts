import { ApiPropertyOptional } from "@nestjs/swagger";
import { MAX_AVAILABLE_PLACES } from "@src/modules/monitoring/constants/available-places";
import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";

export class UpdateMonitoringDto {
  @ApiPropertyOptional({
    format: "string",
    example: "Aula de Matemática",
  })
  @IsOptional()
  @IsString()
  public title?: string;

  @ApiPropertyOptional({
    format: "string",
    example: "Aula de Matemática para alumnos de 1º de ESO.",
  })
  @IsOptional()
  @IsString()
  public description?: string;

  @ApiPropertyOptional({
    type: Number,
    minimum: 1,
    maximum: MAX_AVAILABLE_PLACES,
    example: 2,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(MAX_AVAILABLE_PLACES)
  public maxAvailablePlaces?: number;

  @ApiPropertyOptional({
    format: "uuid",
    example: "f8b31e68-ffda-4362-b5d9-2265abdc115a",
  })
  @IsOptional()
  @IsUUID()
  public subjectId?: string;
}
