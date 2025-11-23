# Cloud Deployment

## 1. Justification for Cloud Provider Selection

I selected **Amazon Web Services (AWS)** as the cloud provider for deploying the EdgeCase application. The decision was based on several key factors that align with the project's requirements for scalability, reliability, and industry relevance.

### Industry Standard and Market Dominance
AWS is the leading cloud service provider globally. Utilizing AWS for this project demonstrates proficiency with the industry-standard platform, which is a highly transferable skill for software engineering roles.

### Infrastructure as a Service (IaaS) Control
I chose to use **Amazon EC2 (Elastic Compute Cloud)**, an IaaS offering, rather than a Platform as a Service (PaaS) like Heroku or AWS Elastic Beanstalk. This decision provides:
- **Granular Control**: Full root access to the server allows for precise configuration of the operating system, Docker daemon, and Nginx proxy.
- **Flexibility**: The ability to run a custom Docker Compose stack with specific networking and volume configurations that might be restricted in a PaaS environment.
- **Cost-Effectiveness**: A single t2.micro or t3.micro instance can host the entire microservices stack (Frontend, Backend, Database, Proxy) within the AWS Free Tier, making it a cost-effective architecture for this application.

### Integrated Ecosystem
AWS offers a cohesive ecosystem of services. By using **AWS ECR (Elastic Container Registry)** for storing Docker images, I ensure seamless authentication and fast image pulls from the EC2 instance, as both are within the AWS network.

## 2. Container Image Implementation

The application is fully containerized using **Docker**, ensuring consistency between the development and production environments. I implemented container images for both the backend and frontend services using multi-stage builds to optimize image size and security.

### Backend Image
The backend is a Java Spring Boot application. Its Docker image is built using a single-stage approach:
1.  **Base Image**: Uses `maven:3.9-eclipse-temurin-17` as the base image, which contains both the JDK and Maven.
2.  **Build & Run**: The source code is copied into the container, and `mvn clean package` is executed to build the JAR file. The container then exposes port 8080 and runs the application using `java -jar`.

### Frontend Image
The frontend is a Next.js application. Its Docker image is also built using a multi-stage approach:
1.  **Build Stage**: Uses a `node` image to install dependencies (`npm ci`) and build the static export of the application (`npm run build`).
2.  **Runtime Stage**: Uses the high-performance `nginx:alpine` image. The static files generated in the build stage are copied to the Nginx web root. A custom `nginx.conf` is also copied to handle client-side routing (SPA). This separation ensures that the heavy Node.js runtime and `node_modules` are not present in the production image, significantly reducing its size and improving security.

### Registry and Orchestration
- **AWS ECR**: The built images are tagged with the commit SHA and pushed to a public repository on AWS Elastic Container Registry (ECR). This provides a centralized and reliable source for the production images.
- **Docker Compose**: In production, a `docker-compose.prod.yml` file defines the services. It pulls the specific image versions from ECR and orchestrates the containers, handling networking, environment variables, and volume mounts for data persistence.