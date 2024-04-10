import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class FindAllMonitoringAvailabilitiesDto {
  @ApiProperty({
    format: "uuid",
    example: "f8b31e68-ffda-4362-b5d9-2265abdc115a",
  })
  @IsNotEmpty()
  @IsUUID()
  public monitoringId!: string;
}
