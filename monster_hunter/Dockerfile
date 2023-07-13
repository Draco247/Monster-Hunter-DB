#
# Build stage
#
# Use the official maven/Java 8 image to create a build artifact.
# https://hub.docker.com/_/maven
FROM maven:3.8-openjdk-17
#
# # Copy local code to the container image.
COPY . .
#
# # Build a release artifact.
RUN mvn clean package


#
# Package stage
#
# It's important to use OpenJDK 8u191 or above that has container support enabled.
# https://hub.docker.com/r/adoptopenjdk/openjdk8
# https://docs.docker.com/develop/develop-images/multistage-build/#use-multi-stage-builds
FROM openjdk:17-jdk-slim

# Copy the jar to the production image from the builder stage.
COPY --from=build /target/monster_hunter-0.0.1-SNAPSHOT.jar monster_hunter-0.0.1.jar

# ENV PORT=8080
EXPOSE 8080

# Run the web service on container startup.
ENTRYPOINT ["java","-jar","monster_hunter-0.0.1-SNAPSHOT.jar"]