# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

Server runs on PORT defined in `.env` file. 

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## API Endpoints

### User

- `GET /user` - Get all users
- `GET /user/:id` - Get user by ID
- `POST /user` - Create user
- `PUT /user/:id` - Update user password
- `DELETE /user/:id` - Delete user

### Artist

- `GET /artist` - Get all artists
- `GET /artist/:id` - Get artist by ID
- `POST /artist` - Create artist
- `PUT /artist/:id` - Update artist info
- `DELETE /artist/:id` - Delete artist

### Track

- `GET /track` - Get all tracks
- `GET /track/:id` - Get track by ID
- `POST /track` - Create track
- `PUT /track/:id` - Update track info
- `DELETE /track/:id` - Delete track

### Album

- `GET /album` - Get all albums
- `GET /album/:id` - Get album by ID
- `POST /album` - Create album
- `PUT /album/:id` - Update album info
- `DELETE /album/:id` - Delete album

### Favorites

- `GET /favs` - Get all favorites
- `POST /favs/track/:id` - Add track to favorites
- `DELETE /favs/track/:id` - Remove track from favorites
- `POST /favs/album/:id` - Add album to favorites
- `DELETE /favs/album/:id` - Remove album from favorites
- `POST /favs/artist/:id` - Add artist to favorites
- `DELETE /favs/artist/:id` - Remove artist from favorites

## Database

This project uses a **PostgreSQL** database as its primary datastore. The database is managed within a Docker container and is connected to the application using **TypeORM** for seamless object-relational mapping.

### Database Configuration
The database connection settings are defined in the `docker-compose.yml` file and the application's `.env` file.
Make sure to add all necessary values to the `.env` file before launching the app.

**Sample Environment Variables**:
```env
PG_CONTAINER_NAME=rest_service_postgres_db
PG_USER=mypguser
PG_PASSWORD=mypgpassword
PG_DB=mypgdb
PG_HOST=db
PG_PORT=5432
```

## Steps to Start the Containers

###

- Build and start the containers:

``` docker compose up --build```

- Verify that the containers are running:

```docker ps```

- To stop the containers, run:

```docker compose down```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
