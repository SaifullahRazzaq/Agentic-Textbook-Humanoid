FROM node:20-slim

WORKDIR /app

COPY package*.json ./

# Install build tools required for native modules like better-sqlite3
RUN apt-get update && apt-get install -y build-essential python3 && rm -rf /var/lib/apt/lists/*

# Install all dependencies (including devDependencies for build) with cache clean
RUN npm cache clean --force && npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
