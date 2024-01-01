import {
  ContextId,
  ContextIdFactory,
  ContextIdResolver,
  ContextIdResolverFn,
  ContextIdStrategy,
  HostComponentInfo,
} from '@nestjs/core';
import { Request } from 'express';

export class AggregateByTenantContextIdStrategy implements ContextIdStrategy {
  private readonly tenants = new Map<string, ContextId>();

  attach(
    contextId: ContextId,
    request: Request,
  ): ContextIdResolverFn | ContextIdResolver | undefined {
    const tenantId = request.headers['x-tenant-id'] as string;
    if (!tenantId) {
      return () => contextId;
    }

    let created: ContextId | undefined;
    if (!this.tenants.has(tenantId)) {
      created = ContextIdFactory.create();
      this.tenants.set(tenantId, created);
    }
    const tenantSubTreeId = this.tenants.get(tenantId) || created!;

    return {
      payload: { tenantId },
      resolve: (info: HostComponentInfo) => {
        return info.isTreeDurable ? tenantSubTreeId : contextId;
      },
    };
  }
}
