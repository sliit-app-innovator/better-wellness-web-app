    # Step 1: Build Stage
    FROM node:18-alpine AS build

    # Set working directory
    WORKDIR /app

    # Copy package.json and package-lock.json
    COPY package*.json ./

    # Install dependencies
    RUN npm install

    # Copy the rest of the application
    COPY . .

    # Build the React app
    RUN npm run build

    # Step 2: Production Stage
    FROM nginx:alpine

    # Copy the build output to Nginx's html directory
    COPY --from=build /app/build /usr/share/nginx/html

    # Copy custom Nginx config (optional)
    # COPY nginx.conf /etc/nginx/nginx.conf

    # Expose port 80
    EXPOSE 80

    # Start Nginx
    CMD ["nginx", "-g", "daemon off;"]
