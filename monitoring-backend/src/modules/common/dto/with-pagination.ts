import { PAGINATION_LIMIT } from "@src/modules/common/constants/pagination";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, Min } from "class-validator";

export class WithPagination {
  @ApiPropertyOptional({ default: PAGINATION_LIMIT })
  @IsOptional()
  @IsNumber()
  @Min(1)
  public limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  public offset?: number;
}
