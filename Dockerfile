FROM node:18.19.0-alpine

ARG DB_HOST
ENV DB_HOST=$DB_HOST

ARG DB_PORT
ENV DB_PORT=$DB_PORT

ARG DB_USERNAME
ENV DB_USERNAME=$DB_USERNAME

ARG DB_PASSWORD
ENV DB_PASSWORD=$DB_PASSWORD

ARG DB_NAME
ENV DB_NAME=$DB_NAME


WORKDIR /app

COPY ./client ./client

WORKDIR /app/client

RUN npm install
RUN npm run build


WORKDIR /app
COPY ./server ./server

WORKDIR /app/server
RUN npm cache clean --force
RUN npm install

RUN npm run build

EXPOSE 8080
CMD ["node" , "dist/main.js"]