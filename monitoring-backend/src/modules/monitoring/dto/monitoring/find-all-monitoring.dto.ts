import { WithPagination } from "@src/modules/common/dto/with-pagination";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";

// Find all monitoring by title, description, createdBy, and subject
export class FindAllMonitoringDto extends WithPagination {
  @ApiPropertyOptional({
    format: "string",
    example: "Matemática",
  })
  @IsOptional()
  @IsString()
  public keyword?: string;

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
    format: "uuid",
    example: "f8b31e68-ffda-4362-b5d9-2265abdc115a",
  })
  @IsOptional()
  @IsUUID()
  public createdBy?: string;

  @ApiPropertyOptional({
    format: "uuid",
    example: "f8b31e68-ffda-4362-b5d9-2265abdc115a",
  })
  @IsOptional()
  @IsUUID()
  public subject?: string;
}
