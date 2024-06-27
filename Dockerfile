FROM node:20-alpine AS builder

RUN apk add --no-cache make g++ python3

WORKDIR /app

COPY package*.json ./

RUN npm install && npm rebuild bcrypt --build-from-source

COPY . .

COPY .env .env

RUN npm run build

EXPOSE 9000

CMD ["node", "dist/server.js"]
