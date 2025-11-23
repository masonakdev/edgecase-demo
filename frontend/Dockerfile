# Build frontend static site
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .

ENV NEXT_PUBLIC_API_BASE_URL=https://edgecase-backend.masonak.dev

RUN npm ci
RUN npm run build

# Serve frontend static site on port 80 via nginx
FROM nginx:alpine
COPY --from=builder /app/out/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80