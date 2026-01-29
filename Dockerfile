# Use the official Node.js image as the base  
FROM node:20.11.0  

# Set the working directory inside the container  
WORKDIR /app  

# Copy package.json and package-lock.json FIRST to leverage Docker cache
# This layer is only invalidated if the package*.json files change
COPY package*.json ./

# Install dependencies. Use 'npm ci' for reproducible builds.
RUN npm ci --only=production

# Copy the rest of the application source code
COPY . .

# Build the Next.js app  
RUN npm run -w @sfgov/next build 

# Expose the port the app will run on  
EXPOSE 3000 

USER root 

HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl -f http://localhost:3000/services || exit 1
# Start the app  
CMD ["npm", "run", "-w", "@sfgov/next", "start"]