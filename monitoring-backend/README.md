# MONITORING

## Run backend in development mode

Locate in directory `/monitoring-backend` and follow the instructions below:

1. Copy the file `.env.example` to `.env` and set up the environment variables

Locate in directory `/docker/development` and run the command `docker compose up -d`

2. Run `npm install` to install project dependencies
3. Run `npm run start:dev` to start the server in development mode, create database tables (happens in dev mode)
4. Run `npm run migration:run` to run migrations (needs database tables previously created)


## IMPORTANT

In production move, does the the env var DB_SYNCHRONIZE=false create the database tables when running the application for first time?
