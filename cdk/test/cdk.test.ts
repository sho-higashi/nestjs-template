import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { HelloCdkStack } from '../lib/cdk-stack';

test('S3 Bucket Created', () => {
  const app = new App();
  const stack = new HelloCdkStack(app, 'MyTestStack');

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::S3::Bucket', {
    VersioningConfiguration: { Status: 'Enabled' },
  });

  expect(1).toBe(1);
});
