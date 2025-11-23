# Developer Setup Guide

This guide provides instructions for setting up the **EdgeCase** application locally for development and maintenance.

## Prerequisites

Ensure you have the following software installed:

- **Docker Desktop**: Required for running the database.
- **Git**: For version control.
- **Java Development Kit (JDK) 17**: Required for backend development.
- **Node.js (v20+)**: Required for frontend development.
- **pnpm**: Recommended package manager for the frontend.

## 1. Local Development Setup

For active development, run the database in a Docker container while running the Backend and Frontend services natively on your machine. This allows for hot-reloading and easier debugging.

### 1.1 Database Setup

From the project root directory, start the PostgreSQL database container using the local DB compose file:

```bash
docker compose -f docker-compose.dev.yml up -d
```

- **Credentials**:
  - User: `edgecase_user`
  - Password: `edgecase_password`
  - Database: `edgecase`
  - Port: `5432`

### 1.2 Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Run the application:
    ```bash
    ./mvnw spring-boot:run
    ```

The backend will start on `http://localhost:8080`.

### 1.3 Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

3.  Start the development server:
    ```bash
    pnpm dev
    ```

The frontend will be accessible at `http://localhost:3000`.

## 2. Troubleshooting

### Port Conflicts
If you see errors about ports `5432`, `8080`, or `3000` being in use:
- Check if other services are running.
- Stop any running Docker containers: `docker compose down`.
- Kill conflicting processes.

### Database Connection Issues
If the backend cannot connect to the database:
- Ensure the database container is running: `docker ps`.
- Verify the credentials match those in `backend/src/main/resources/application.yml`.