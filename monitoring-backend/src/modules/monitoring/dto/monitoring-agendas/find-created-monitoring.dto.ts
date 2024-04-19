import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";

export class FindCreatedMonitoringAgendasDto {
  @ApiProperty({
    format: "uuid",
    example: "5d9a814a-fbf3-4228-8d12-0765aabe8643",
  })
  @IsOptional()
  @IsUUID()
  public createdById?: string;
}
