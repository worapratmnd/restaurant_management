# Install guide

### Requirement

- Nodejs version 18
- Docker (optional)

## STEP 1 set up Database

### MYSQL

1. Start up your database

   OR run this command for setup MYSQL with docker

```shell
    docker-compose up -d -f docker/mysql/docker-compose.yaml
```

2. run script or copy from **[/script/mysql.sql](https://github.com/worapratmnd/restaurant_management/blob/main/script/mysql.sql)** to run sql command to set up database table

## STEP 2 Setup backend

1. Edit file `./api/.env` for config database connection

```
    MYSQL_DATABASE_DIALECT=mysql
    MYSQL_DATABASE_HOST=YOUR_HOST
    MYSQL_DATABASE_PORT=3306
    MYSQL_DATABASE_USER=YOUR_USER
    MYSQL_DATABASE_PASSWORD=YOUR_PASSWORD
    MYSQL_DATABASE_NAME=YOUR_DATABASE_NAME
```

2. Setup and run

install package

```shell
    npm install
```

start with command

```shell
    npm run dev
```

server will start with url **[http://localhost:3000](http://localhost:3000)**

## STEP 3 Setup frontend

Setup and run

install package

```shell
    npm install
```

Run ng serve for a dev server Navigate to **[http://localhost:4200](http://localhost:4200)** The app will automatically reload if you change any of the source files.

```shell
    ng serve
```

## Login Account

| Username | Password |
| -------- | -------- |
| admin    | 111111   |
