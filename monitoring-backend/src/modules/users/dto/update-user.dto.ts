import { ApiPropertyOptional } from "@nestjs/swagger";
import { UpdateProfileDto } from "@src/modules/users/dto/update-profile.dto";
import { Type } from "class-transformer";
import { IsEmail, IsOptional, IsString, ValidateNested } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  public email?: string;

  @IsOptional()
  @IsString()
  public password?: string;

  @ApiPropertyOptional({
    type: UpdateProfileDto,
    example: {
      firstName: "Jane",
      lastName: "Doe",
      age: 25,
      genre: "Female",
      overview: "I am no software engineer",
      degreeId: "c9b9b4b3-7b2b-4b3e-bf0f-1c4e1c8a1e0d",
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateProfileDto)
  public profile?: UpdateProfileDto;
}
