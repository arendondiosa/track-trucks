# Base image for shared dependencies
FROM node:22-alpine AS base
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .

# Development image
FROM base AS dev
EXPOSE 3000
CMD ["yarn", "dev", "--", "--host"]

# Production build
FROM base AS builder
RUN yarn build

# Production image
FROM nginx:alpine AS prod
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
COPY public /usr/share/nginx/html
EXPOSE 80
