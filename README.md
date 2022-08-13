# Music Library API

## About

The Music library API project as part of the Manchester Codes Backend Module

The project implements RESTful routes and allows users to perform CRUD (Create, Read, Update, Delete) operations on artist and albums in a MySQL database.

## Installation

- Pull a MySQL image and run the container via Docker
- Clone this repo
- Change in to repo directory
- Run npm install
- Create a .env file and add local variables:
  - DB_PASSWORD
  - DB_NAME
  - DB_USER
  - DB_HOST
  - DB_PORT
  - PORT
- If you wan to run the tests create a .env.test file with the same environmental variables changing the DB_NAME variable.
- Run `npm start` to start the project
- Run `npm test` to run the tests

![Database schema](https://i.ibb.co/Hpq5yYq/Screenshot-2022-08-13-at-13-37-57.png)

## Routes

### Artists

- Create: POST to /artist
- Read all: GET to /artist
- Read single: GET to /artist/:artistId
- Update: PATCH to /artist/artistId
- Delete: DELETE to /artist/:artistId

### Albums

- Create: POST to /artist/id/album
- Read all: GET to /album
- Read single: GET to /album/:albumId
- Update: PATCH to /album/:albumId
- Delete: DELETE to /album/:albumId
