# MONITORING

## Run backend in development mode

Locate in directory `/docker/development` and run the command `docker compose up -d`

Locate in directory `/monitoring-backend` and follow the instructions below:

1. Rename the file `.env.example` to `.env` and set up the environment variables
2. Run `npm install` to install project dependencies
3. Run `npm run start:dev` to start the server in development mode and create database tables
4. Run  `npm run migration:run` to run migrations to populate initial data

## IMPORTANT
In production move, does the the env var DB_SYNCHRONIZE=false create the database tables when running the application for first time?