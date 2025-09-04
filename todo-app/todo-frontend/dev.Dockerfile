# todo-app/todo-frontend/dev.Dockerfile

FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]
