import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsUUID } from "class-validator";

export class CreateMonitoringAgendaDto {
  @ApiProperty({
    format: "uuid",
    example: "f8b31e68-ffda-4362-b5d9-2265abdc115a",
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
    example: "2023-03-01",
  })
  @IsNotEmpty()
  @IsDateString()
  public endDate!: string;
}
