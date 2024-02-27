# passwordsManager


## Development mode:
-make sure your node version is 18

### Database:

_install mysql if uninstalled_

In terminal run the following commands in order to create the database.

```
mysql
  $ mysql -hlocalhost -uroot -p
  $ create database passwords_manager;
  $ exit;

```

## How to install:
In day-by-day folder in different terminal tabs:

    - cd client
    - npm install

    - cd server
    - npm install

## How to run:

In the fitting folder:

-   server: npm run start:dev

-   client: npm run dev




## Run with docker compose:

docker compose build

docker compose up -d

to open web: [link](http://localhost:8080/login)