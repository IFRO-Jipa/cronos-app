FROM node:23 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS source

COPY . /var/cronos-app/.source/front-end
WORKDIR /var/cronos-app/.source/front-end

FROM source AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM prod-deps AS dev-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM dev-deps as build
RUN pnpm run build

FROM nginx
COPY --from=build /var/cronos-app/.source/front-end/dist /usr/share/nginx/html
