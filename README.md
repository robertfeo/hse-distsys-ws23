# Todo List Application Overview
[![CI/CD Pipeline](https://github.com/robertfeo/hse-distsys-ws23/actions/workflows/pipeline.yml/badge.svg)](https://github.com/robertfeo/hse-distsys-ws23/actions/workflows/pipeline.yml)
[![codecov](https://codecov.io/gh/robertfeo/hse-distsys-ws23/branch/dev/graph/badge.svg?token=QZQZQZQZQZ)](https://codecov.io/gh/robertfeo/hse-distsys-ws23)

The Todo List Application is a full-stack web application that provides a convenient interface for managing a to-do list. It utilizes Docker containers to encapsulate the backend, frontend, and database components, ensuring a consistent and easily reproducible environment for development, testing, and production.


## Using Docker Compose

This application is designed to run using Docker Compose, which orchestrates multiple containers to work together. The provided `docker-compose.yml` file contains the configuration needed to build and run the application services.

### Prerequisites Docker

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

- [Overview](#overview-frontend)
- [Prerequisites](#prerequisites-frontend)
- [Installation and Setup](#installation-and-setup-frontend)
- [Running the Application](#running-the-application-frontend)
- [User Interface Components](#user-interface-components-frontend)
  - [Todo List View](#todo-list-view-frontend)
  - [Add Todo Item Form](#add-todo-item-form-frontend)
  - [Todo Item Actions](#todo-item-actions-frontend)
- [Interaction with Backend API](#interaction-with-backend-api-frontend)
- [Error Handling and Notifications](#error-handling-and-notifications-frontend)


### Overview

These instructions will guide you through setting up the frontend on your local machine for development and testing purposes.

### Prerequisites

Before starting the frontend, ensure you have the following installed:

- Node.js (LTS version recommended)
- npm (Node Package Manager)
- Todo List API running on the backend (see Backend Documentation)

### Installation and Setup

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

### User Interface Components

#### Todo List View

Renders the list of todo items and handles state management.

#### Add Todo Item Form

Displays individual todo items and provides options to edit or delete.

#### Todo Item Actions

A form component that captures user input for new todo items.

### Interaction with Backend API

Ensure the backend API is running and accessible. By default, the frontend will attempt to connect to the API at http://localhost:8080/api/todos.

### Error Handling and Notifications

The frontend application communicates errors from the API to the user via alerts or error messages displayed in the UI. It also handles exceptions in the user interface gracefully.

## Backend Documentation

The Todo List API is a simple RESTful service that allows users to manage their todo items.

### Table of Contents

- [Overview](#overview-backend)
- [Prerequisites](#prerequisites-backend)
- [Installation and Setup](#installation-and-setup-backend)
- [Running the Application](#running-the-application-backend)
- [API Endpoints](#api-endpoints-backend)
  - [List Todos](#list-todos-backend)
  - [Create Todo Item](#create-todo-item-backend)
  - [Retrieve Todo Item](#retrieve-todo-item-backend)
  - [Update Todo Item](#update-todo-item-backend)
  - [Delete Todo Item](#delete-todo-item-backend)
- [Data Models](#data-models-backend)
- [Error Handling and Responses](#error-handling-and-responses-backend)
- [Database Configuration and Management](#database-configuration-and-management-backend)
- [Observability and Tracing](#observability-and-tracing)
  - [What is Jaeger?](#what-is-jaeger)
  - [Integration with the Backend](#integration-with-the-backend)
    - [Configuring Tracing](#configuring-tracing)
    - [Using the Jaeger UI](#using-the-jaeger-ui)
  - [Analyzing Traces](#analyzing-traces)
  - [Logs and Metrics](#logs-and-metrics)
  - [Adding Tracing to New Services](#adding-tracing-to-new-services)

### Overview

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before running the service, you need to have the following installed:

- Java JDK 17 or higher
- Maven
- PostgreSQL database

### Installation and Setup

1. Clone the repository to your local machine.
2. Set up your PostgreSQL database using the provided connection details.
3. Run the following command to build the project:

```bash
mvn clean install
```
### Running the Application

Start the application with:

```bash
java -jar target/todo-list-backend-0.0.1-SNAPSHOT.jar
```

The API will be available at http://localhost:8080/api.

### API Endpoints

#### List Todos

GET /api/todos
Retrieves a list of all todo items.

#### Create Todo Item

POST /api/todos/add
Accepts a JSON object representing a todo item to be added.

#### Retrieve Todo Item

GET /api/todos/search
Query Parameters(only one required):

- title: Search by the title of the todo item.
- id: Search by the ID of the todo item.

#### Update Todo Item

PUT /api/todos/update/{id}
Path Variable:
- id: The ID of the todo item to update.

Accepts a JSON object representing the updated fields of the todo item.

#### Delete Todo Item

DELETE /api/todos/delete
Query Parameters:

- title: Delete by the title of the todo item.
- id: Delete by the ID of the todo item.

### Data Models

#### TodoItem

- id (Integer): Unique identifier for the TodoItem (autogenerated)
- title (String): Title of the TodoItem.
- isChecked (boolean): Status of the TodoItem.

### Database Configuration and Management

Ensure the application connects to your PostgreSQL database with the following settings:

```bash
spring.datasource.url=jdbc:postgresql://database:5432/todolist
spring.datasource.username=robert
spring.datasource.password=securepassword
```

### Error Handling and Responses

The API uses HTTP status codes to indicate the success or failure of an API request. In the case of errors, a JSON object with error details is returned.

### Observability and Tracing

In a distributed system, it's crucial to have insights into the application's performance and to trace the flow of requests through various services. To achieve this, the application is integrated with Jaeger, an open-source tracing system.

#### What is Jaeger?

Jaeger is a tracing system released by Uber, which provides monitoring and troubleshooting capabilities for microservice-based architectures. It allows developers to track request flows, measure performance, and monitor distributed transactions.

#### Integration with the Backend

Our backend service is configured to send trace data to a Jaeger agent. This is achieved through the use of OpenTracing libraries, which are compatible with Jaeger.

##### Configuring Tracing

To enable tracing with Jaeger, the following environment variables are set for the backend service in the `docker-compose.yml`:

```yaml
environment:
  JAEGER_SERVICE_NAME: todo-list-backend
  JAEGER_AGENT_HOST: jaeger
  JAEGER_AGENT_PORT: 6831
```

These settings direct the backend service to send trace data to the Jaeger agent hosted within our Docker environment.

#### Using the Jaeger UI

To view traces:

Navigate to http://localhost:16686 - this is the default port where the Jaeger UI is accessible.
Select the service name from the drop-down list.
Use the search functionality to filter specific traces.

#### Analyzing Traces

The Jaeger UI provides a detailed view of the traces, showing the spans of each trace with timings, which can be used to identify performance bottlenecks or failures in the request flow.

#### Logs and Metrics

In addition to tracing, logs and metrics can be observed through Jaeger's integration, providing a comprehensive overview of the system's health and performance.

#### Adding Tracing to New Services

When adding new services to the application, they can be instrumented using the OpenTracing API and configured to report to the same Jaeger instance, ensuring a unified view of the system's traces.
