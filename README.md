# Express CRUD API for Todos

This README.md file provides an overview of a CRUD (Create, Read, Update, Delete) API built using Express.JS for managing a collection of Todos.

## Introduction

Managing tasks and to-dos is an essential part of many applications, and this Express CRUD API is designed to simplify the process of handling Todo items. The API allows you to perform various operations on a collection of Todos, such as creating new todos, retrieving existing ones, updating task details, and deleting tasks.

### Todo Data Structure

The Todos managed by this API are represented as JSON objects with the following structure:

```json
{
  "id": 1,
  "text": "Todo 1",
  "isCompleted": false
}
```

Each Todo object has an `id` (a unique identifier), a `text` describing the task, and an `isCompleted` flag indicating whether the task has been completed or not.

With this Express CRUD API, you can easily perform the following actions on your Todos:

- **Create:** Add new Todos to your list.
- **Read:** Retrieve information about existing Todos or fetch a list of all Todos.
- **Update:** Modify the text or completion status of a Todo.
- **Delete:** Remove a Todo from your list.

This README will guide you on how to set up and use this API effectively, including example requests and responses to help you get started. Let's begin by setting up the environment and exploring the available endpoints.

---

## Getting Started

- Run the following commands in Bash for Project Setup:

```bash
npm init
git init
git remote add origin <<git_repository_link>>
```

- Setup ESlint, Prettier and Husky using the link given below:
  [Configure ESlint, Prettier and Husky](https://dev.to/ruppysuppy/automatically-format-your-code-on-git-commit-using-husky-eslint-prettier-in-9-minutes-45eg)
- Install ExpressJS, Sequelize:

```bash
npm install --save express
npm install --save sequelize
npm install --save pg pg-hstore

```

## Endpoints:

#

Express HTTP CRUD API

Welcome to the Express HTTP CRUD API project! In this project, you will create a simple HTTP API for managing todos. Todos will be stored in a PostgreSQL database, and you will implement various endpoints for performing CRUD operations on them.

## Table of Contents

1.  [Features]
2.  [Installation]
3.  [Usage]
4.  [Endpoints]
5.  [Error Handling]
6.  [Technologies Used]
7.  [Contributing]
8.  [License]

## Features

- Fetch a list of todos.
- Fetch the details of a specific todo.
- Create a new todo.
- Update an existing todo.
- Delete a todo.

## Installation

1.  Clone this repository to your local machine:

    bashCopy code

    `git clone https://github.com/aditya-6394express-http-crud-api.git`

2.  Navigate to the project directory:

    bashCopy code

    `cd express-http-crud-api`

3.  Install the project dependencies:

    bashCopy code

    `npm install`

4.  Configure your PostgreSQL database connection by modifying the `config/database.js` file.
5.  Create the required PostgreSQL database tables using Sequelize migrations:

    bashCopy code

    `npx sequelize-cli db:migrate`

## Usage

To start the Express server, use the following command:

bashCopy code

`npm start`

The server will start, and you can access the API using the defined endpoints (see the next section for details).

## Endpoints

### Fetch Todo List

- **Endpoint:** `GET /todos`
- **Description:** Fetch a list of all existing todos.
- **Response:**

`{
  "allTodos": [
    {
      "id": 1,
      "text": "Todo 1",
      "isCompleted": false
    },
    {
      "id": 2,
      "text": "Todo 2",
      "isCompleted": false
    },
    {
      "id": 3,
      "text": "Todo 3",
      "isCompleted": true
    }
  ]
}`

### Fetch Todo Detail

- **Endpoint:** `GET /todos/:id`
- **Description:** Fetch details of a specific todo by its ID.
- **Response (Success):**
  `{
  "id": 1,
  "text": "Todo 1",
  "isCompleted": false
}`

- **Response (Not Found):**

`{
  "message": "Not Found"
}`

### Create Todo

- **Endpoint:** `POST /todos`
- **Description:** Create a new todo and store it in the database.
- **Request Body:**
  `{
  "text": "Learn SQL",
  "isCompleted": false
}`

- **Response (Success):**
  `{
  "id": 5,
  "text": "Learn SQL",
  "isCompleted": false
}`

- **Response (Bad Request):**

`{
  "message": "Invalid request body"
}`

### Update Todo

- **Endpoint:** `PUT /todos/:id`
- **Description:** Update an existing todo by its ID.
- **Request Body:**

`{
  "id": 1,
  "text": "Updated Todo 1",
  "isCompleted": true
}`

- **Response (Success):**

`{
  "id": 1,
  "text": "Updated Todo 1",
  "isCompleted": true
}`

### Delete Todo

- **Endpoint:** `DELETE /todos/:id`
- **Description:** Delete a todo by its ID.
- **Response (Success):**

`{
  "message": "Todo deleted successfully"
}`

- **Response (Not Found):**

`{
  "message": "Todo not found"
}`

## Error Handling

- The API returns appropriate HTTP status codes for different scenarios, such as 200 (OK), 201 (Created), 400 (Bad Request), and 404 (Not Found).
- Validation of request data is performed using the Yup library, and bad requests are handled with a 400 status code.
- When a requested resource is not found, a 404 status code is returned with an informative message.
