#!/usr/bin/env node
import 'source-map-support/register';

import { App } from 'aws-cdk-lib';

import { CdkEventBridgeCronStack } from '../lib/cdk-stack';

const app = new App();

new CdkEventBridgeCronStack(app, 'CdkEventBridgeCronStack', {});
