#
# Build stage
#
FROM maven:3.8.2-jdk-11 AS build
COPY . .

#
# Package stage
#
FROM openjdk:17-jdk-slim
COPY --from=build /target/monster_hunter-0.0.1-SNAPSHOT.jar monster_hunter-0.0.1.jar
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["java","-jar","monster_hunter-0.0.1.jar"]