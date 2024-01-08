## deployment

* bootstrap (execute once per account)

```sh
cdk bootstrap aws://ACCOUNT-NUMBER/REGION
```

* deploy

```sh
pnpm synth:cdk
pnpm diff:cdk
pnpm deploy:cdk
```
