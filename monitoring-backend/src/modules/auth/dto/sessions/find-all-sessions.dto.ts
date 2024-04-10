import { WithPagination } from "@src/modules/common/dto/with-pagination";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";

export class FindAllSessionsDto extends WithPagination {
  @ApiPropertyOptional({
    format: "uuid",
    example: "5aa3450e-aa67-4704-aed1-57335484bffb",
  })
  @IsOptional()
  @IsUUID()
  public userId?: string;
}
