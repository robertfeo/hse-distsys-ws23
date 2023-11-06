# Todo List Application Overview

The Todo List Application is a full-stack web application that provides a convenient interface for managing a to-do list. It utilizes Docker containers to encapsulate the backend, frontend, and database components, ensuring a consistent and easily reproducible environment for development, testing, and production.

## Using Docker Compose

This application is designed to run using Docker Compose, which orchestrates multiple containers to work together. The provided `docker-compose.yml` file contains the configuration needed to build and run the application services.

### Prerequisites

Before you can use Docker Compose to run the application, you must install:
- Docker
- Docker Compose

Refer to the [official Docker documentation](https://docs.docker.com/get-docker/) for instructions on installing Docker, and the [Docker Compose documentation](https://docs.docker.com/compose/install/) for Docker Compose installation steps.

### Running the Application with Docker Compose

1. Clone the repository to your local machine.
2. Navigate to the directory containing the `docker-compose.yml` file.
3. Run the following command to build and start the services:

   ```bash
   docker-compose up --build
   ```
This will start the backend, frontend, and database services as well as a Jaeger instance for tracing. The frontend will be accessible at http://localhost:3000, and the backend will be available at http://localhost:8080.

### Data Persistence
The database service is configured to use a named volume (db-data) to persist data. This means your database data will remain intact even if the container is stopped or removed.

### Observability with Jaeger
Jaeger is included in the Docker Compose setup for tracing the application requests. It provides a web interface accessible at http://localhost:16686 to view traces.

### Customization
If you need to customize the environment variables or any other settings, you can modify the docker-compose.yml file accordingly. For example, to change database credentials, update the POSTGRES_USER and POSTGRES_PASSWORD environment variables under the database service.

## Documentation Structure
This documentation covers the following areas:

- Backend Documentation: Details the RESTful API provided by the backend service, including available endpoints and data models.
- Frontend Documentation: Describes the React-based frontend service, including its setup, features, and how to interact with the backend API.

## Frontend Documentation
### Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Features](#features)
  - [View All Todos](#view-all-todos)
  - [Search Todo Item](#search-todo-item)
  - [Add Todo Item](#add-todo-item)
  - [Delete Todo Item](#delete-todo-item)
  - [Update Todo Item](#update-todo-item)
- [Components](#components)
- [Running the Application](#running-the-application)
- [Error Handling](#error-handling)

### Getting Started

These instructions will guide you through setting up the frontend on your local machine for development and testing purposes.

### Prerequisites

Before starting the frontend, ensure you have the following installed:
- Node.js (LTS version recommended)
- npm (Node Package Manager)
- Todo List API running on the backend (see Backend Documentation)

### Installation

1. Clone the frontend repository to your local machine.
2. Navigate to the cloned directory.
3. Install the necessary npm packages with:

```bash
npm install
```
Start the development server with:
```bash
npm start
```

The application will be served at http://localhost:3000 and will communicate with the Todo List API.

### Features
#### View All Todos
Displays a list of all todo items fetched from the API.

#### Search Todo Item
Allows users to search for a todo item by title or id.

#### Add Todo Item
Provides a form to input and submit a new todo item to the API.

#### Delete Todo Item
Enables users to delete a todo item by providing its title or id.

#### Update Todo Item
Users can update the status or title of a todo item through the UI.

### Components
#### TodoList
Renders the list of todo items and handles state management.

#### TodoItem
Displays individual todo items and provides options to edit or delete.

#### AddTodoForm
A form component that captures user input for new todo items.

### Running the Application
Ensure the backend API is running and accessible. By default, the frontend will attempt to connect to the API at http://localhost:8080/api/todos.

### Error Handling
The frontend application communicates errors from the API to the user via alerts or error messages displayed in the UI. It also handles exceptions in the user interface gracefully.

## Backend Documentation
The Todo List API is a simple RESTful service that allows users to manage their todo items.

### Table of Contents
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Get All Todos](#get-all-todos)
  - [Search Todo Item](#search-todo-item)
  - [Add Todo Item](#add-todo-item)
  - [Delete Todo Item](#delete-todo-item)
  - [Update Todo Item](#update-todo-item)
- [Models](#models)
- [Database Configuration](#database-configuration)
- [Error Handling](#error-handling)

### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Prerequisites

Before running the service, you need to have the following installed:
- Java JDK 17 or higher
- Maven
- PostgreSQL database

#### Installation

1. Clone the repository to your local machine.
2. Set up your PostgreSQL database using the provided connection details.
3. Run the following command to build the project:

```bash
mvn clean install
```

Start the application with:
```bash
java -jar target/todo-list-backend-0.0.1-SNAPSHOT.jar
```

The API will be available at http://localhost:8080/api/todos.

### API Endpoints
#### Get All Todos
GET /api/todos
Retrieves a list of all todo items.
#### Search Todo Item
GET /api/todos/search
Query Parameters:
- title: Search by the title of the todo item.
- id: Search by the ID of the todo item.

#### Add Todo Item
POST /api/todos/add
Accepts a JSON object representing a todo item to be added.

#### Delete Todo Item
DELETE /api/todos/delete
Query Parameters:
- title: Delete by the title of the todo item.
- id: Delete by the ID of the todo item.

#### Update Todo Item
PUT /api/todos/update/{id}
Path Variable:
- id: The ID of the todo item to update.
Accepts a JSON object representing the updated fields of the todo item.

### Models
#### TodoItem
- id (Integer): Unique identifier for the TodoItem (autogenerated)
- title (String): Title of the TodoItem.
- isChecked (boolean): Status of the TodoItem.

### Database Configuration
Ensure the application connects to your PostgreSQL database with the following settings:
```bash
spring.datasource.url=jdbc:postgresql://database:5432/todolist
spring.datasource.username=robert
spring.datasource.password=securepassword
```
### Error Handling
The API uses HTTP status codes to indicate the success or failure of an API request. In the case of errors, a JSON object with error details is returned.
