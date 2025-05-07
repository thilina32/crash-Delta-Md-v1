# Node.js 20 base image
FROM node:20

# Working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install -g pm2 && npm install

# Copy rest of the project files
COPY . .

# Start using PM2
CMD ["node", "index.js"]
