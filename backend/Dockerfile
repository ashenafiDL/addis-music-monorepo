# Use the official Node.js image.
FROM node:20

# Set the working directory.
WORKDIR /usr/src/app/backend

# Install app dependencies.
COPY package*.json ./
RUN npm install

# Copy app source code.
COPY . .

# Expose port 3000.
EXPOSE 4000

# Run the application.
CMD ["node", "app.js"]
