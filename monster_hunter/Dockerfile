FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY target/*.jar monster_hunter-0.0.1.jar
ENTRYPOINT ["java","-jar","/monster_hunter-0.0.1.jar"]
EXPOSE 8080
#COPY --from=build /target/monster_hunter-0.0.1-SNAPSHOT.jar monster_hunter-0.0.1.jar
## ENV PORT=8080
#EXPOSE 8080
#ENTRYPOINT ["java","-jar","monster_hunter-0.0.1.jar"]