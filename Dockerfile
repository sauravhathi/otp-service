FROM node:16.14.2-alpine

COPY . /app

WORKDIR /app

COPY package*.json ./

RUN yarn install 

EXPOSE 3000

CMD ["yarn","start"]