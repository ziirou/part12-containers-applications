# todo-app/todo-frontend/Dockerfile

FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY . .

# for separate runs
#ENV VITE_BACKEND_URL=http://localhost:3000

# for full stack with Nginx
ENV VITE_BACKEND_URL=api/

RUN npm ci
RUN npm run build

FROM build-stage AS test-stage
RUN npm run test

FROM nginx:1.25-alpine

COPY --from=test-stage /usr/src/app/dist /usr/share/nginx/html
