import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fs from 'fs';
import { join } from 'path';

import { AppModule } from './app.module';
import { DOCUMENT_JWT_AUTH_NAME, SCHEMA_FILE_NAME } from './consts';
import { AppConfigService, AppLoggingService } from './modules/core';
import { isEnvForDev } from './utils';

const setupOpenapiDocument = (app: INestApplication) => {
  const openapiConfig = new DocumentBuilder()
    .setTitle('nestjs template')
    .setDescription('user and post api description')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setVersion('1.0')
    .addBearerAuth(
      { bearerFormat: 'JWT', scheme: 'bearer', type: 'http' },
      DOCUMENT_JWT_AUTH_NAME,
    )
    .build();
  const document = SwaggerModule.createDocument(app, openapiConfig);
  fs.writeFileSync(
    join(process.cwd(), `./src/${SCHEMA_FILE_NAME}`),
    JSON.stringify(document),
  );
  SwaggerModule.setup('api-document', app, document);
};

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      bufferLogs: true,
    });
    const config = app.get(AppConfigService);

    /** logging */
    app.useLogger(app.get(AppLoggingService));

    /** openapi */
    const env = config.get('ENV');
    if (isEnvForDev(env)) {
      setupOpenapiDocument(app);
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
