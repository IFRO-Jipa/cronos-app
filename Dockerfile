FROM oven/bun:1 AS base
ENV BUN_INSTALL_CACHE_DIR="/bun/install/cache"

FROM base AS source
COPY . /var/cronos-app/.source/
WORKDIR /var/cronos-app/.source/

FROM source AS prod-deps
RUN --mount=type=cache,id=bun,target=/bun/install/cache bun install --prod --frozen-lockfile 

FROM prod-deps AS dev-deps
RUN --mount=type=cache,id=bun,target=/bun/install/cache bun install --frozen-lockfile 

FROM dev-deps AS front-end-build
WORKDIR /var/cronos-app/.source/front-end/
RUN bun run build

FROM nginx:1 AS front-end-runtime
COPY --from=front-end-build /var/cronos-app/.source/front-end/dist /usr/share/nginx/html
