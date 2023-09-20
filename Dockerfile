FROM node:16.14.2-alpine

COPY . /app

WORKDIR /app

COPY package*.json ./

RUN yarn install 

EXPOSE 5001

CMD ["yarn","start"]