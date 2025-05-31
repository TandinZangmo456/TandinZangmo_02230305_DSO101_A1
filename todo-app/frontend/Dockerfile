# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --production --silent
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Create default nginx.conf
RUN echo "server { \
    listen 80; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files \$uri \$uri/ /index.html; \
    } \
    error_page 500 502 503 504 /50x.html; \
    location = /50x.html { \
        root /usr/share/nginx/html; \
    } \
}" > /etc/nginx/conf.d/default.conf

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Attempt to copy custom nginx.conf (silent if missing)
COPY nginx.conf /etc/nginx/conf.d/default.conf 2>/dev/null || echo "Using default nginx configuration" > /dev/null

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]