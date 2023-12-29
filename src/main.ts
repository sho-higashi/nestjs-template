import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fs from 'fs';

import { AppModule } from './app.module';
import { DOC_JWT_AUTH_NAME } from './consts';
import { AppLoggingService } from './modules/infra/app-logging/app-logging.service';
import { AppConfigService } from './modules/infra/config/app-config.service';
import { isEnvForDev } from './utils';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      bufferLogs: true,
    });
    const config = app.get(AppConfigService);

    /** logging */
    app.useLogger(app.get(AppLoggingService));

    /** swagger */
    const env = config.get('ENV');
    if (isEnvForDev(env)) {
      const swaggerConfig = new DocumentBuilder()
        .setTitle('nestjs template')
        .setDescription('user and post api description')
        .setVersion('1.0')
        .addBearerAuth(
          { bearerFormat: 'JWT', scheme: 'bearer', type: 'http' },
          DOC_JWT_AUTH_NAME,
        )
        .build();
      const document = SwaggerModule.createDocument(app, swaggerConfig);
      fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
      SwaggerModule.setup('docs', app, document);
    }

    app.enableShutdownHooks();

    const port = config.get('PORT');
    await app.listen(port);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(
      `failed to initialize. stack ${
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        'stack' in (err as any) ? (err as any).stack : err
      }`,
    );
    process.exit(1);
  }
}
bootstrap();
