import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "@src/modules/auth/guards/access-token.guard";
import { UpdateUserDto } from "@src/modules/users/dto/update-user.dto";
import { User } from "@src/modules/users/entities/user.entity";
import { UsersService } from "@src/modules/users/users.service";

@ApiTags("Users")
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller("users")
export class UsersController {
  public constructor(private usersService: UsersService) {}

  @Get(":userId")
  @HttpCode(HttpStatus.OK)
  public async findOne(@Param("userId") userId: string): Promise<User> {
    const user = await this.usersService.findOne(userId);
    return user;
  }

  @Patch(":userId")
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param("userId") userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(userId, updateUserDto);
  }

  @Delete(":userId")
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(@Param("userId") userId: string): Promise<void> {
    await this.usersService.remove(userId);
  }
}
