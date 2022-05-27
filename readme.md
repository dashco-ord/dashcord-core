# Dashcord
The in house student performance monitor made specificly with our college needs in mind

## What is this project about ? 
This is a student performance monitor for Teacher Incharge scheme at our college

## Setting up
1. clone the repo 
2. cd dashcord
3. run ```yarn install``` to install all the dependencies
4. run ```yarn prisma migrate dev``` to sync the schema with you're database
5. run ```yarn dev``` to start the dev server

> Note : Make sure to provide the database connection string as DATABASE_URL in the .env file before step 4

### Licence
This project is Licenced under [BSD 3-Clause License](./LICENSE)
