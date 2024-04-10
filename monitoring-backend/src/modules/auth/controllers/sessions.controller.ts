import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { FindAllSessionsDto } from "@src/modules/auth/dto/sessions/find-all-sessions.dto";
import { UserSession } from "@src/modules/auth/entities/user-session.entity";
import { AccessTokenGuard } from "@src/modules/auth/guards/access-token.guard";
import { RefreshTokenGuard } from "@src/modules/auth/guards/refresh-token.guard";
import { SessionsService } from "@src/modules/auth/services/sessions.service";
import { AuthTokens } from "@src/modules/auth/types/auth-tokens";

@ApiTags("Session")
@ApiBearerAuth()
@Controller("sessions")
export class SessionsController {
  public constructor(private sessionsService: SessionsService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(
    @Query() findAllSessionsDto: FindAllSessionsDto,
  ): Promise<UserSession[]> {
    return await this.sessionsService.findAll(findAllSessionsDto);
  }

  @UseGuards(RefreshTokenGuard)
  @Get("refresh")
  @HttpCode(HttpStatus.OK)
  public async refresh(): Promise<AuthTokens> {
    return await this.sessionsService.refresh();
  }

  @UseGuards(AccessTokenGuard)
  @Get(":sessionId")
  @HttpCode(HttpStatus.OK)
  public async findOne(
    @Param("sessionId") sessionId: string,
  ): Promise<UserSession> {
    const session = await this.sessionsService.findOne(sessionId);
    return session;
  }

  @UseGuards(AccessTokenGuard)
  @Delete("logout")
  @HttpCode(HttpStatus.NO_CONTENT)
  public async logout(): Promise<void> {
    await this.sessionsService.logout();
  }

  @UseGuards(AccessTokenGuard)
  @Delete(":sessionId")
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(@Param("sessionId") sessionId: string): Promise<void> {
    await this.sessionsService.remove(sessionId);
  }
}
