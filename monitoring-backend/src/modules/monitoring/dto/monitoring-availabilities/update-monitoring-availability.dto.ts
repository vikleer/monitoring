import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AVAILABILITY_TYPES } from "@src/modules/monitoring/constants/availability-types";
import { MonitoringAvailabilityType } from "@src/modules/monitoring/types/monitoring-availability-type";
import { MonitoringRecurrence } from "@src/modules/monitoring/types/monitoring-recurrence";
import { IsIn, IsNotEmpty } from "class-validator";

export class UpdateMonitoringAvailabilityDto {
  @ApiPropertyOptional({
    type: String,
    enum: AVAILABILITY_TYPES,
    example: "weekly",
  })
  @IsNotEmpty()
  @IsIn(AVAILABILITY_TYPES)
  public type!: MonitoringAvailabilityType;

  @ApiProperty({
    example: {
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
  })
  @IsNotEmpty()
  public recurrence!: MonitoringRecurrence;
}
