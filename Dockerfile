# Stage 1: Build the application
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json separately for better caching
COPY package.json package-lock.json ./

RUN npm install

# Copy the rest of the application files
COPY . .

RUN npm run build

# Stage 2: Set up the Nginx server
FROM nginx:stable-alpine

# Remove the default Nginx index.html file
RUN rm /usr/share/nginx/html/index.html

# Copy built files from the build stage to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
