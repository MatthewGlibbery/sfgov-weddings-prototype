# Use the official Node.js image as the base  
FROM node:20.11.0  

# Set the working directory inside the container  
WORKDIR /app  

# Copy the app source code to the container  
COPY . .  

# Install dependencies  
RUN npm install

# Build the Next.js app  
RUN npm run -w @sfgov/next build 

# Expose the port the app will run on  
EXPOSE 3000  
HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl -f http://localhost:3000/services || exit 1
# Start the app  
CMD ["npm", "run", "-w", "@sfgov/next", "start"]