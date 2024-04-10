import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import DATABASE_CONFIG from "@src/config/database.config";
import { AuthModule } from "@src/modules/auth/auth.module";
import { DegreesModule } from "@src/modules/degrees/degrees.module";
import { MonitoringModule } from "@src/modules/monitoring/monitoring.module";
import { UsersModule } from "@src/modules/users/users.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, load: [DATABASE_CONFIG] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get("database") as TypeOrmModuleOptions;
      },
    }),
    AuthModule,
    UsersModule,
    MonitoringModule,
    DegreesModule,
  ],
})
export class AppModule {}
