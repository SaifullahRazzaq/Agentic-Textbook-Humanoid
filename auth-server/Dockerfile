FROM node:20-slim

WORKDIR /app

COPY package*.json ./

# Install all dependencies (including devDependencies for build) with cache clean
RUN npm cache clean --force && npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
