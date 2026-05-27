# Stage-1 & specify a name 'builder'
FROM  node:20-alpine AS builder

# Create a directory  and go to the directory 
WORKDIR /app

# Copy the package.json file to my current directory to install the necessary dependence  
COPY package*.json .

# Install the dependence
RUN npm install

# Copy other files to my current directory
COPY . .

# Expose VITE_SERVER_URI build arg for Vite compile
ARG VITE_SERVER_URI
ENV VITE_SERVER_URI=$VITE_SERVER_URI

# Build and optimize static file
RUN npm run build

# Stage-2
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the static file to my Nginx folder to serve static contain
COPY --from=builder /app/dist /usr/share/nginx/html

# Open the port to react
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]