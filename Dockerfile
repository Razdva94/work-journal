# syntax=docker/dockerfile:1.7

FROM node:lts-alpine AS frontend-builder

WORKDIR /client

COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install --no-audit

COPY frontend ./
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
RUN npm run build

FROM node:lts-alpine AS backend-build

WORKDIR /app/server

COPY backend/package.json backend/package-lock.json* ./
COPY backend/prisma ./prisma

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN npm install --no-audit
RUN npm run prisma:generate

COPY backend/nest-cli.json backend/tsconfig.json ./
COPY backend/src ./src
RUN npm run build

FROM node:lts-alpine AS runtime

WORKDIR /app

COPY --from=backend-build /app/server/node_modules ./server/node_modules
COPY --from=backend-build /app/server/dist ./server/dist
COPY --from=backend-build /app/server/prisma ./server/prisma
COPY --from=backend-build /app/server/package.json ./server/package.json

COPY --from=frontend-builder /client/dist ./client

EXPOSE 3001

CMD ["sh", "-c", "cd server && npx prisma migrate deploy && node dist/main.js"]
