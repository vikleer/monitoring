import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsUUID } from "class-validator";

export class ScheduleMonitoringDto {
  @ApiProperty({
    format: "uuid",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsNotEmpty()
  @IsUUID()
  public monitoringId!: string;

  @ApiProperty({
    format: "date",
    example: "2024-03-04T18:00:00.000Z",
  })
  @IsNotEmpty()
  @IsDateString()
  public startDate!: string;

  @ApiProperty({
    format: "date",
    example: "2024-03-04T18:00:00.000Z",
  })
  @IsNotEmpty()
  @IsDateString()
  public endDate!: string;
}
