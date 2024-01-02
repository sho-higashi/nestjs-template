import { AggregateRoot } from '@nestjs/cqrs';

import { Version } from './value-objects/version';

const VERSION = Symbol('version');

export class VersionedAggregateRoot extends AggregateRoot {
  private [VERSION] = new Version(0);

  public id!: string;

  constructor() {
    super();
  }

  get version(): Version {
    return this[VERSION];
  }

  private setVersion(version: Version): void {
    this[VERSION] = version;
  }
}
