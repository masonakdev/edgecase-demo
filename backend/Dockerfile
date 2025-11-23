# Build Stage
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /src
COPY pom.xml .
COPY src src
RUN mvn -B -DskipTests clean package

# Run Stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /src/target/*.jar ./edgecase-backend.jar
EXPOSE 8080
CMD ["java", "-jar", "./edgecase-backend.jar"]