import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { CdkEventBridgeCronStack } from '../lib/cdk-stack';

test('EventBridge Stack Created', () => {
  const app = new App();
  const stack = new CdkEventBridgeCronStack(app, 'TestStack');

  const template = Template.fromStack(stack);
  expect(() => {
    template.hasResourceProperties('AWS::Events::Connection', {
      AuthParameters: {
        ApiKeyAuthParameters: {
          ApiKeyName: 'Authorization',
        },
      },
      AuthorizationType: 'API_KEY',
      Name: 'cdk-eventbridge-call-slack-api-connection',
    });
  }).not.toThrow();

  expect(() => {
    template.hasResourceProperties('AWS::Events::ApiDestination', {
      HttpMethod: 'POST',
      InvocationEndpoint: 'https://slack.com/api/chat.postMessage',
      Name: 'cdk-eventbridge-call-slack-api-destination',
    });
  }).not.toThrow();

  expect(() => {
    template.hasResourceProperties('AWS::Events::Rule', {
      ScheduleExpression: 'cron(* * * * ? *)',
      State: 'ENABLED',
    });
  }).not.toThrow();
});
