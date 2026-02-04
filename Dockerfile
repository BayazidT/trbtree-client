# ---- Build Stage ----
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* yarn.lock* ./
RUN npm ci --omit=dev

# Copy the rest of the app
COPY . .

# Build the app with Turbopack (optional, --turbopack works only in dev, build uses standard Next.js build)
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS runner

WORKDIR /app

# Copy build output and node_modules from builder
COPY --from=builder /app/ ./

# Expose port
EXPOSE 3000

# Run the app
CMD ["npm", "run", "start"]
