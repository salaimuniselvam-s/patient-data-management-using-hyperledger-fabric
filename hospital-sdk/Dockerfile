# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Create a working directory for fabric-network
WORKDIR /app/fabric-network

# Copy the contents of the fabric-network directory into the image
COPY fabric-network/ . 

# Install dependencies for fabric-network
RUN npm install

# Create a working directory for the node server
WORKDIR /app/node-server

# Copy the contents of the node server directory into the image
COPY node-server/ .

# Install dependencies for the node server
RUN npm install

RUN npm uninstall bcrypt

RUN npm install bcrypt

# Expose any necessary ports
EXPOSE 3001

# Set the entrypoint for the image
CMD ["sh", "-c", "npm start && npm run enroll"]

# docker run -v ${PWD}/organizations/peerOrganizations:/hospital-network/organizations/peerOrganizations  --name hosp-sdk --network docker_hospital-network -p 3001:3001 -p 127.0.0.1:7054:7054 hosp-sdk 
