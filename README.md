# Project Distributed Systems @ HSE

## Build the Docker Image:

Navigate to the directory containing your Dockerfile and execute the following command to build the Docker image:

```docker build -t mypostgres:latest .```

This will create a Docker image named "mypostgres" with the tag "latest".

Run the Docker Container:

After building the image, you can run a container instance using the following command:

```docker run -d --name mypostgres-container -p 5432:5432 mypostgres:latest```

Here, you are mapping port 5432 inside the container to port 5432 on your host machine, allowing you to access the PostgreSQL instance.

Check if the Container is Running:

Use the following command to check the status of your containers:

```docker ps```

## Build the Spring Boot Application:
Navigate to the root directory of your Spring Boot project (where the pom.xml is located) and execute:

```mvn clean package```

This will create a .jar file in the target directory.

Build the Docker Image:
Still in the root directory of your project (where the Dockerfile is located), run:

```docker build -t backend-todolist .```


Run the Docker Container:

```docker run -p 8080:8080 backend-todolist```