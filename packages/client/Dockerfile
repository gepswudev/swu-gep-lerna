# Use an official Node.js runtime as the base image
FROM node:16 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json, package-lock.json, and pnpm-lock.yaml to the container
COPY package*.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install project dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code to the container
COPY . .

# Build the Vite.js project
RUN pnpm build

# Use a lightweight web server to serve the built files
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default HTTP port
EXPOSE 5173

# Start the Nginx web server
CMD ["nginx", "-g", "daemon off;"]
