FROM node:20-alpine AS build

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/frontend/build ./build

RUN npm install -g serve

COPY package*.json ./
RUN npm install --production

EXPOSE 3000

CMD ["serve", "-s", "build"]
