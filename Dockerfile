# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Run tests
RUN npm test

# Build library and examples
RUN npm run build && npm run build:examples

# Production stage
FROM nginx:alpine

# Copy built examples to nginx
COPY --from=builder /app/dist-examples /usr/share/nginx/html

# Copy custom nginx config for SPA support
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
