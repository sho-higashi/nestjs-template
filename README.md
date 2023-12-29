a template app for nestjs

- nestjs
- app
- prisma
- postgres

## preparation

```sh
pnpm install
cp .env.sample .env
docker compose up -d
pnpm gen:db
pnpm reset:db
```

default ports

```txt
app: 3000
postgres: 5432
```

## develop app

start app

```sh
pnpm dev
```

### api interface

open api docs with html

<http://localhost:3000/api-document>

download open api spec in json format

```sh
curl http://localhost:3000/api-document/api > openapi-spec.json
```

### test

```sh
# prepare db for testing
pnpm prepare:e2e:test
# unit test
pnpm test:ut
# api test
pnpm test:e2e
```

### health check

```sh
curl 'http://localhost:3000/.well-known/health'
```

returns

```json
{
  "status": "ok",
  "info": {
    "prisma": {
      "status": "up"
    }
  },
  "error": {
    
  },
  "details": {
    "prisma": {
      "status": "up"
    }
  }
}
```

## develop dockerfile for production

```sh
# build
docker build --progress=plain -f ./Dockerfile -t nestjs-template .

# run on host port 3001
docker run -p 3001:3000 --network host nestjs-template
```
