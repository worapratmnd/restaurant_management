# Install guide

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

## STEP 2 Install backend

Edit file `./api/.env` for config database connection

```
    MYSQL_DATABASE_DIALECT=mysql
    MYSQL_DATABASE_HOST=YOUR_HOST
    MYSQL_DATABASE_PORT=3306
    MYSQL_DATABASE_USER=YOUR_USER
    MYSQL_DATABASE_PASSWORD=YOUR_PASSWORD
    MYSQL_DATABASE_NAME=YOUR_DATABASE_NAME
```
