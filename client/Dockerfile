FROM node:18.19.0-alpine


WORKDIR /app

COPY . ./

EXPOSE 3000

RUN npm install

RUN npm run build
