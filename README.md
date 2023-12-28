## preparation

```sh
pnpm install
```

## develop app

```sh
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## develop dockerfile for production

```sh
# build
docker build --progress=plain -f ./Dockerfile -t nestjs-template .

# run
docker run -p 3000:3000 -d nestjs-template
```
