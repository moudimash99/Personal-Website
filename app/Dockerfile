# ---- build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Build
COPY . .
RUN npm run build

# ---- run stage ----
FROM node:20-alpine
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# Optional: add curl for debugging/health checks
RUN apk add --no-cache curl

COPY --from=build /app ./

EXPOSE 3000
# Use PORT env or default; Next's 'start' honors -p
CMD ["npm", "run", "start", "--", "-p", "3000"]
