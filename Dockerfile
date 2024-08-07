# Base image
FROM node:16-alpine 

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

ENV NODE_ENV production 

# Creates a "dist" folder with the production build
RUN npm run build