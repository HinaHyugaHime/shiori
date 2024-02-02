FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS install
WORKDIR /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN bun install --frozen-lockfile

WORKDIR /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN bun install --frozen-lockfile --production

FROM base AS prerelease
WORKDIR /usr/src/app
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/src .
COPY --from=prerelease /usr/src/app/package.json .
COPY --from=prerelease /usr/src/app/bunfig.toml .

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "index.ts" ]
