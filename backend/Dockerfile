# Use the official OpenJDK image as a base image
FROM openjdk:11-jre-slim

# Information about the maintainer
LABEL maintainer="rofeit00@hs-esslingen.de"

# Specify the location where the app will reside inside the container
WORKDIR /app

# Copy the jar file into the container
COPY target/backend-*.jar app.jar

# The command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

# Expose the application's port (Change 8080 if your app runs on a different port)
EXPOSE 8080
