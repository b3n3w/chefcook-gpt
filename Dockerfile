FROM node:lts-slim as build

WORKDIR /usr/app

COPY . .

RUN npm install
RUN npm run build

## Production image
FROM node:lts-slim as run

WORKDIR /usr/app

COPY vite.config.ts ./
COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/package*.json ./
COPY --from=build /usr/app/.svelte-kit ./.svelte-kit

ENV NODE_ENV=production

ENTRYPOINT [ "npm", "run", "start" ]