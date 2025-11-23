# Build Stage
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /src
COPY pom.xml .
COPY src src
RUN mvn -B -DskipTests clean package

# Run Stage
FROM eclipse-temurin:17-jre
WORKDIR /app

# Set SPRING_DATASOURCE_USERNAME and SPRING_DATASOURCE_PASSWORD in prod
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/edgecase \
    SPRING_JPA_HIBERNATE_DDL_AUTO=validate

COPY --from=builder /src/target/*.jar ./edgecase-backend.jar
EXPOSE 8080
CMD ["java", "-jar", "./edgecase-backend.jar"]