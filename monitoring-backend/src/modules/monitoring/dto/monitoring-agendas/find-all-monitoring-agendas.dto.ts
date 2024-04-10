import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsUUID } from "class-validator";

export class FindAllMonitoringAgendasDto {
  @ApiProperty({
    format: "uuid",
    example: "5d9a814a-fbf3-4228-8d12-0765aabe8643",
  })
  @IsNotEmpty()
  @IsUUID()
  public monitoringId!: string;

  @ApiProperty({
    format: "date",
    example: "2023-03-01",
  })
  @IsNotEmpty()
  @IsDateString()
  public startDate!: string;

  @ApiProperty({
    format: "date",
    example: "2023-03-30",
  })
  @IsNotEmpty()
  @IsDateString()
  public endDate!: string;
}
