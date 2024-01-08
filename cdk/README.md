## deployment

* bootstrap (execute once per account)

```sh
cdk bootstrap aws://ACCOUNT-NUMBER/REGION
```

* before deploy

create a secret manager with name `event-bridge-api-key`
and set key-value pair

* Authorization
  * Api key created by slack with post message authorization
  * example `Bearer xyz`(include `Bearer`)
* ChannelId
  * slack channel to post message
  * example `C1234567`

* deploy

```sh
pnpm synth:cdk
pnpm diff:cdk
pnpm deploy:cdk
```

* destroy

```sh
pnpm cdk destroy
```

* test

```sh
# build during test
pnpm test
```
