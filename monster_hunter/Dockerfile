FROM maven:3-eclipse-temurin-17 AS build
COPY . .
RUN mvn clean package -Pprod -DskipTests
FROM eclipse-temurin:17-alpine
COPY --from=build /target/monster_hunter-0.0.1-SNAPSHOT.jar monster_hunter.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","monster_hunter.jar"]