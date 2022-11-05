FROM node:18.4.0
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY lib ./lib

CMD ["npm", "start"]
