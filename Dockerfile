# ─────────────────────────────────────────
# Stage 1: Build
# Uses Node to install dependencies and
# compile the React + TypeScript app.
# ─────────────────────────────────────────
FROM node:20-alpine AS builder

# Set working directory inside container
WORKDIR /app

# Copy package files first (better layer caching —
# only reinstalls if package.json changes)
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy rest of source code
COPY . .

# Build the production bundle
RUN npm run build

# ─────────────────────────────────────────
# Stage 2: Serve
# Uses lightweight Nginx to serve the
# built static files. No Node needed!
# Final image is much smaller this way.
# ─────────────────────────────────────────
FROM nginx:alpine AS production

# Copy built files from Stage 1 into Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx in foreground (required for Docker)
CMD ["nginx", "-g", "daemon off;"]
