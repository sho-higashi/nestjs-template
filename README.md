a template app for nestjs using

- nestjs
- openapi
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
prisma studio: 5555
```

## develop app

start app

```sh
pnpm dev
```

- request to server from swagger ui(<http://localhost:3000/api-document> ) or other tools(e.g. postman)
- to reset data, use "reset app" command in tasks.json

### prisma studio

<http://localhost:5555/>

### api interface

openapi docs is available as swagger ui

<http://localhost:3000/api-document>

download openapi spec in json format

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

### commit

- semantic git commits by git-cz is recommended
- commit by following commands

```sh
pnpm commit
# or
pnpm commit:all
```

### develop dockerfile for production

```sh
# build
docker build --progress=plain -f ./Dockerfile -t nestjs-template .

# run
docker run -p 3000:3000 --env-file=.env --network nestjs-template_postgres nestjs-template
```

## generate typed api client(openapi-typescript and openapi-fetch example)

download openapi spec in json format

```sh
# replace http://localhost:3000 with deployed endpoint
curl http://localhost:3000/api-document/api > openapi-spec.json
```

install library and generate type

```sh
npm i -D openapi-typescript
npx openapi-typescript openapi-spec.json -o ./src/lib/api/v1.d.ts
```

typed api client is available using generated d.ts file and openapi-fetch
see <https://github.com/drwpow/openapi-typescript/tree/main/packages/openapi-fetch> for detail

```typescript
// src/client.ts
import createClient from "openapi-fetch";
import { paths } from "./lib/api/v1";

const { GET, PUT } = createClient<paths>({ baseUrl: "http://localhost:3000/" });
```
