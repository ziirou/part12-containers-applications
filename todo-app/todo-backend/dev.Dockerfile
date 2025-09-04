# todo-app/todo-backend/dev.Dockerfile

FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm install -g nodemon

CMD ["npm", "run", "dev"]
