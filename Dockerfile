FROM node:20-bullseye-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

# deps
FROM base AS installer
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# builder
FROM base AS builder
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm gen:db && pnpm build
RUN ls -lsa /app/dist
RUN ls -lsa /app/node_modules

# runner
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=installer /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules/.prisma/client /app/node_modules/.prisma/client

EXPOSE 3000

CMD [ "node", "dist/main.js" ]