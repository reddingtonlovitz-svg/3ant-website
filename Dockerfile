# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build the app
COPY . .
RUN npm run build

# Stage 2: Serve
FROM node:18-alpine

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy necessary files
COPY --from=build /app/dist ./dist
COPY server ./server

# Ensure data directory exists
RUN mkdir -p server/data

EXPOSE 8080

CMD ["node", "server/index.js"]
