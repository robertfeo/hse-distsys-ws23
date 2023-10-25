FROM node:21-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:production

CMD ["npm", "run", "start:production"]