import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "@src/app.module";
import { ForbiddenErrorFilter } from "@src/exception-filters/forbidden-error.filter";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Monitoring")
    .setDescription("Monitoring description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  app.useGlobalFilters(new ForbiddenErrorFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
