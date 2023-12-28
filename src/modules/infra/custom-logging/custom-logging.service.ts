import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import { CLS_ID, ClsService } from 'nestjs-cls';
import { match } from 'ts-pattern';

@Injectable()
export class CustomLoggingService implements LoggerService {
  private logger = console;

  constructor(private readonly cls: ClsService) {}

  #requestId() {
    try {
      this.cls.get(CLS_ID);
    } catch {
      return undefined;
    }
  }

  /**
   * @see https://qiita.com/mdbr92/items/5390e4a2fdcc53362e42
   */
  private write(level: LogLevel, ...args: unknown[]) {
    const time = new Date().toISOString();
    const context = args.pop();
    const message = args.shift();
    const params = args.length !== 0 ? args : undefined;

    const msg = {
      context,
      level,
      message,
      params,
      requestId: this.#requestId(),
      time,
    };
    match(level)
      .with('warn', () => this.logger.warn(msg))
      .with('error', () => this.logger.error(msg))
      .otherwise(() => this.logger.log(msg));
  }

  log(...args: unknown[]) {
    this.write('log', ...args);
  }

  warn(...args: unknown[]) {
    this.write('warn', ...args);
  }

  error(...args: unknown[]) {
    this.write('error', ...args);
  }
}
