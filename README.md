# TodoList Application README

This README provides guidelines on how to set up and use the TodoList application built with Express.js and MySQL. The app features a robust API for managing todo lists and users.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js
- MySQL
- npm or yarn

## Database Setup

To set up your MySQL database, run the following SQL queries to create the necessary tables:

```
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(255) NOT NULL,
    nrp CHAR(10) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE todolists (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

Ensure that MySQL is running and that you have executed these scripts in your MySQL instance to create the database schema.

## Installing the Application

Clone the repository and install dependencies:

```bash
git clone https://github.com/mochavin/express-todoapp.git
cd express-todoapp
npm install
```

## Running the Application

Start the application by running:

```bash
npm start
```

## API Endpoints

### Todo Lists

- `POST /todolists`: Create a new todo list.
- `GET /todolists`: Retrieve all todo lists.
- `GET /todolists/user/:user_id`: Retrieve all todo lists by user ID.
- `GET /todolists/:id`: Retrieve a todo list by ID.
- `PUT /todolists/:id`: Update a todo list by ID.
- `DELETE /todolists/:id`: Delete a todo list by ID.

### Users

- `POST /users`: Create a new user.
- `GET /users`: Retrieve all users.
- `GET /users/:uuid`: Retrieve a user by UUID.
- `PUT /users/:uuid`: Update a user by UUID.
- `DELETE /users/:uuid`: Delete a user by UUID.

## API Documentation

For detailed information on API endpoints and usage, please refer to our [Postman documentation](https://documenter.getpostman.com/view/27279192/2sA3BuV8LA).

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.