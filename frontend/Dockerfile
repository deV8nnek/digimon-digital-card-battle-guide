FROM node:lts-alpine AS build

WORKDIR /frontend

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target={PNPM_HOME}/.cache \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=bind,source=package.json,target=package.json \
    pnpm install --frozen-lockfile --prod

FROM build AS final

COPY . .
RUN pnpm next telemetry disable && \ 
    pnpm next build

EXPOSE 3000

CMD [ "pnpm", "next", "start" ]