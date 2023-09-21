# Use an official Node.js 18 runtime as the base image
FROM node:16-alpine

# Set the working directory within the container
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy the package.json and pnpm-lock.yaml to the container
COPY package.json /usr/src/app
COPY pnpm-lock.yaml /usr/src/app

# Install nodemon
RUN npm install -g pnpm

# Install application dependencies using pnpm
RUN pnpm install 

# Copy the rest of the application code to the container
COPY . .

# Set NODE_ENV to production or development
ENV NODE_ENV=production

# Expose the desired port (5001 in this case)
EXPOSE 5001

# Start the Express.js application
CMD ["pnpm", "start"]
