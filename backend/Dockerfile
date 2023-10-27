# Build stage
FROM maven:3.8.5-openjdk-17-slim as build
WORKDIR /app
COPY . .
RUN mvn clean package

# Run stage
FROM openjdk:17-jdk-slim

ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

ADD https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar .
ENV JAVA_TOOL_OPTIONS "-javaagent:./opentelemetry-javaagent.jar"

ENTRYPOINT ["java","-jar","/app.jar"]
