import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";

export class FindAllMonitoringSchedulesDto {
  @ApiProperty({
    format: "uuid",
    example: "f8b31e68-ffda-4362-b5d9-2265abdc115a",
  })
  @IsOptional()
  @IsUUID()
  public userId?: string;
}
