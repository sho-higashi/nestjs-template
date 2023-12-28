import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { Environment } from './utils';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    const config = app.get<ConfigService<Environment, true>>(ConfigService);
    const port = config.get('PORT', { infer: true });

    await app.listen(port);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(
      `failed to initialize. stack ${
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        'stack' in (err as any) ? (err as any).stack : err
      }`,
    );
  }
}
bootstrap();
