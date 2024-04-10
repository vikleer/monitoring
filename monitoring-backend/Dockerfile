FROM node:alpine3.19

WORKDIR /app

COPY package*.json .

RUN npm install

COPY ./src ./src

COPY .env.production.local .env

COPY nest-cli.json tsconfig*.json ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]