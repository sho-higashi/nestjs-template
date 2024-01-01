import {
  ContextId,
  ContextIdFactory,
  ContextIdResolver,
  ContextIdResolverFn,
  ContextIdStrategy,
  HostComponentInfo,
} from '@nestjs/core';
import { pick } from 'accept-language-parser';
import { Request } from 'express';

import { I18nService } from '../modules/domain/i18n/i18n.service';

export class AggregateByLocaleContextIdStrategy implements ContextIdStrategy {
  private readonly locales = new Map<string, ContextId>();

  attach(
    contextId: ContextId,
    request: Request,
  ): ContextIdResolverFn | ContextIdResolver | undefined {
    const localeCode =
      pick(
        I18nService.supportedLanguages,
        request.headers['accept-language'] || I18nService.defaultLanguage,
      ) ?? I18nService.defaultLanguage;
    if (!localeCode) {
      return () => contextId;
    }

    let created: ContextId | undefined;
    if (!this.locales.has(localeCode)) {
      created = ContextIdFactory.create();
      this.locales.set(localeCode, created);
    }
    const localeSubTreeId = this.locales.get(localeCode) || created!;

    return {
      payload: { localeCode },
      resolve: (info: HostComponentInfo) => {
        return info.isTreeDurable ? localeSubTreeId : contextId;
      },
    };
  }
}
