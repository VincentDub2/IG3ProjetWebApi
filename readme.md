# eattrack api

## Description

This is the backend for the EatTrack app. It is a RESTful API built with Node.js, Express, and Prisma.io . It is deployed on AWS EC2 and uses a SQL database.

## Installation

To install this app, clone the repo and run `npm install` to install the dependencies. You will need to create a `.env` file with the following variables:

```
DATABASE_URL="mysql://<username>:<password>@<host>:<port>/<database>?schema=<schema>"
JWT_SECRET=<secret>
```

```
run `npx prisma migrate dev --name init` to create the database tables.
```

## Running the app

```
npm start
```

## Building the app

```
npm run build
```

## Usage

The app is deployed on AWS EC2 at https://api.eattrack.app:8080
You can use the endpoints below to interact with the API.

## Endpoints

### Authentication

#### POST /auth/register

Register a new user.

#### POST /auth/login


### Users

For updating a user 

#### POST /user/:id

For getting a user

#### GET /user/actual

For get food from a user

#### GET /user/:id/foods

For delete a user

#### DELETE /userDel/:id

### Foods

### GET /food/search

Example: https://api.eattrack.app:8080/food/search?query=apple


### POST /food/add


For update a food

### PUT /food/:id

For delete a food

### DELETE /food/:id