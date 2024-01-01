import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import format from 'string-format';

import type * as Schema from '../assets/locales/en.json';
import * as en from '../assets/locales/en.json';
import * as pl from '../assets/locales/pl.json';

type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

type Join<T extends string[]> = T extends []
  ? never
  : T extends [infer F]
    ? F
    : T extends [infer F, ...infer R]
      ? F extends string
        ? `${F}.${Join<Extract<R, string[]>>}`
        : never
      : string;

@Injectable({ durable: true, scope: Scope.REQUEST })
export class I18nService {
  constructor(
    @Inject(REQUEST)
    private readonly payload: { localeCode: string },
  ) {}

  public static readonly defaultLanguage = 'en';

  private readonly locales: Record<string, typeof Schema> = { en, pl };

  public static readonly supportedLanguages = ['en', 'pl'];

  translate(
    key: Join<PathsToStringProps<typeof Schema>>,
    ...args: Array<string | Record<string, unknown>>
  ): string {
    const locale =
      this.locales[this.payload.localeCode ?? I18nService.defaultLanguage];

    // To support dot notation: "ERRORS.USER_NOT_FOUND"
    const text = key.split('.').reduce<typeof Schema>((o, i) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return o[i as keyof typeof o] as any;
    }, locale);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return format(text as any, ...args);
  }
}
