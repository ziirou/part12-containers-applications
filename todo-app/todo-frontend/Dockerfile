# todo-app/todo-frontend/Dockerfile

FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY . .

ENV VITE_BACKEND_URL=http://localhost:3000

RUN npm ci
RUN npm run build

FROM build-stage AS test-stage
RUN npm run test

FROM nginx:1.25-alpine

COPY --from=test-stage /usr/src/app/dist /usr/share/nginx/html
