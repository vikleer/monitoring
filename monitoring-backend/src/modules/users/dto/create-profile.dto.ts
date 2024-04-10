import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  Min,
} from "class-validator";

export class CreateProfileDto {
  @ApiProperty({ example: "John" })
  @IsNotEmpty()
  @IsString()
  public firstName!: string;

  @ApiProperty({ example: "Doe" })
  @IsNotEmpty()
  @IsString()
  public lastName!: string;

  @ApiProperty({ example: 25 })
  @IsNotEmpty()
  @IsNumber()
  @Min(15)
  @Max(100)
  public age!: number;

  @ApiProperty({ example: "Male" })
  @IsNotEmpty()
  @IsString()
  public gender!: string;

  @ApiProperty({ example: "I am a software engineer" })
  @IsNotEmpty()
  @IsString()
  public overview!: string;

  @ApiProperty({ example: "c9b9b4b3-7b2b-4b3e-bf0f-1c4e1c8a1e0d" })
  @IsNotEmpty()
  @IsUUID()
  public degreeId!: string;
}
