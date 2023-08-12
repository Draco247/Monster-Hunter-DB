FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
COPY --from=build /target/monster_hunter-0.0.1-SNAPSHOT.jar monster_hunter.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","monster_hunter.jar"]
#COPY --from=build /target/monster_hunter-0.0.1-SNAPSHOT.jar monster_hunter-0.0.1.jar
## ENV PORT=8080
#EXPOSE 8080
#ENTRYPOINT ["java","-jar","monster_hunter-0.0.1.jar"]