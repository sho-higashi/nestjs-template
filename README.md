a template app for nestjs

- nestjs
- app
- prisma
- postgres

## preparation

```sh
pnpm install
```

default ports

```txt
app: 3000
postgres: 5432
```

## develop app

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

# run
docker run -p 3000:3000 -d nestjs-template
```
