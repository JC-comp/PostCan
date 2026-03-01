# --- Stage 1: Build ---
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy source and build the project
COPY . .
RUN --mount=type=cache,target=/app/.next/cache \
    npm run build

# --- Stage 2: Production ---
FROM node:20-alpine
WORKDIR /app

# Copy only the necessary files from the builder
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy only the necessary files from the builder
COPY --from=builder /app/.next ./.next

# Start the app using your start script
CMD ["npm", "start"]