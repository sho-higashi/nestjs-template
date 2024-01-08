import * as cdk from 'aws-cdk-lib';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';

/**
 * a cdk stack to post message to slack channel by eventbridge every minute
 */

export class CdkEventBridgeCronStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cdkPrefix = 'cdk-eventbridge-call-slack-api';

    const SECRET_NAME = 'event-bridge-api-key';

    const secretName = cdkPrefix + '-secret';

    const secret = secretsmanager.Secret.fromSecretNameV2(
      this,
      secretName,
      SECRET_NAME,
    );

    const authorizationSecret = secret.secretValueFromJson('Authorization');
    const channelIdSecret = secret.secretValueFromJson('ChannelId');

    const connection = new events.Connection(
      this,
      'post-slack-api-connection',
      {
        authorization: events.Authorization.apiKey(
          'Authorization',
          authorizationSecret,
        ),
        connectionName: cdkPrefix + '-connection',
        description: 'Connection with special password',
        bodyParameters: {
          channel: events.HttpParameter.fromSecret(channelIdSecret),
          text: events.HttpParameter.fromString(
            'post message from eventbridge deployed by cdk with secret manager',
          ),
        },
      },
    );

    const apiDestinationName = cdkPrefix + '-destination';
    const destination = new events.ApiDestination(this, apiDestinationName, {
      apiDestinationName,
      connection,
      description: 'execute post message API',
      endpoint: 'https://slack.com/api/chat.postMessage',
      httpMethod: events.HttpMethod.POST,
    });

    new events.Rule(this, cdkPrefix + '-rule', {
      schedule: events.Schedule.cron({ minute: '*' }),
      targets: [new targets.ApiDestination(destination)],
    });
  }
}
