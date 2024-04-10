import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SignInDto } from "@src/modules/auth/dto/auth/sign-in.dto";
import { AuthService } from "@src/modules/auth/services/auth.service";
import { AuthTokens } from "@src/modules/auth/types/auth-tokens";
import { CreateUserDto } from "@src/modules/users/dto/create-user.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  public constructor(private authService: AuthService) {}

  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  public async signIn(@Body() signInDto: SignInDto): Promise<AuthTokens> {
    return await this.authService.signIn(signInDto);
  }

  @Post("sign-up")
  @HttpCode(HttpStatus.CREATED)
  public async signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.authService.signUp(createUserDto);
  }
}
