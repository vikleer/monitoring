import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
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
}
