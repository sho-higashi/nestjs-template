import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    await app.listen(3000);
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
