import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from "class-validator";

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: "Jane" })
  @IsOptional()
  @IsString()
  public firstName?: string;

  @ApiPropertyOptional({ example: "Doe" })
  @IsOptional()
  @IsString()
  public lastName?: string;

  @ApiPropertyOptional({ example: 25 })
  @IsOptional()
  @IsNumber()
  @Min(15)
  @Max(100)
  public age?: number;

  @ApiPropertyOptional({ example: "Female" })
  @IsOptional()
  @IsString()
  public gender?: string;

  @ApiPropertyOptional({ example: "I am not software engineer" })
  @IsOptional()
  @IsString()
  public overview?: string;

  @ApiPropertyOptional({ example: "c9b9b4b3-7b2b-4b3e-bf0f-1c4e1c8a1e0d" })
  @IsOptional()
  @IsUUID()
  public degreeId?: string;
}
