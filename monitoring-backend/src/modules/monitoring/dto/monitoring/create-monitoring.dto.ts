import { MAX_AVAILABLE_PLACES } from "@src/modules/monitoring/constants/available-places";
import { CreateMonitoringAvailabilityDto } from "@src/modules/monitoring/dto/monitoring-availabilities/create-monitoring-availability.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from "class-validator";

export class CreateMonitoringDto {
  @ApiProperty({
    format: "string",
    example: "Aula de Matemática",
  })
  @IsNotEmpty()
  @IsString()
  public title!: string;

  @ApiProperty({
    format: "string",
    example: "Aula de Matemática para alumnos de 1º de ESO.",
  })
  @IsNotEmpty()
  @IsString()
  public description!: string;

  @ApiProperty({
    type: Number,
    minimum: 1,
    maximum: MAX_AVAILABLE_PLACES,
    example: 2,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(MAX_AVAILABLE_PLACES)
  public maxAvailablePlaces!: number;

  @ApiProperty({
    format: "uuid",
    example: "f8b31e68-ffda-4362-b5d9-2265abdc115a",
  })
  @IsNotEmpty()
  @IsUUID()
  public subjectId!: string;

  @ApiProperty({
    type: CreateMonitoringAvailabilityDto,
    isArray: true,
    example: [
      {
        type: "weekly",
        recurrence: {
          type: "weekly",
          weekDays: [
            {
              day: 1,
              time: {
                start: "13:00",
                end: "15:00",
              },
            },
          ],
        },
      },
    ],
  })
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateMonitoringAvailabilityDto)
  public availabilities!: CreateMonitoringAvailabilityDto[];
}
