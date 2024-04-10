import { ApiProperty } from "@nestjs/swagger";
import { CreateProfileDto } from "@src/modules/users/dto/create-profile.dto";
import { Type } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    format: "email",
    example: "j.vanegas@gmail.com",
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email!: string;

  @ApiProperty({
    format: "password",
    example: "wony",
  })
  @IsNotEmpty()
  @IsString()
  public password!: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateProfileDto)
  public profile!: CreateProfileDto;
}
