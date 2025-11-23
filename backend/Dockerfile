# Dockerfile for Spring Boot backend
FROM maven:3.9-eclipse-temurin-17
WORKDIR /src

COPY pom.xml .
COPY src src

# Set SPRING_DATASOURCE_USERNAME and SPRING_DATASOURCE_PASSWORD in prod
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/edgecase \
    SPRING_JPA_HIBERNATE_DDL_AUTO=validate

RUN mvn -B -DskipTests clean package

COPY target/*.jar ./edgecase-backend.jar

EXPOSE 8080
CMD ["java", "-jar", "./edgecase-backend.jar"]