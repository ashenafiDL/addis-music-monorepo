FROM node:20-alpine AS build

WORKDIR /app/backend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000

CMD ["node", "app.js"]
