import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AppConfigService } from './modules/infra/config/app-config.service';
import { isEnvForDev } from './utils';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      bufferLogs: true,
    });

    const config = app.get(AppConfigService);

    const env = config.get('ENV');
    if (isEnvForDev(env)) {
      const swaggerConfig = new DocumentBuilder()
        .setTitle('nestjs template')
        .setDescription('user and post api description')
        .setVersion('1.0')
        .build();
      const document = SwaggerModule.createDocument(app, swaggerConfig);
      SwaggerModule.setup('docs', app, document);
    }

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
