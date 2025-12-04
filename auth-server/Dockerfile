FROM node:20-slim

WORKDIR /app

COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Install dev dependencies for TypeScript compilation if needed (e.g., for 'tsc')
# This is crucial for local builds and CI/CD environments where compilation happens
RUN npm install --include=dev @types/better-sqlite3

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
