FROM node:16.14.2-alpine

ENV NODE_ENV=production

COPY . /dist

WORKDIR /dist

COPY package*.json ./
COPY .env ./

RUN yarn install 

EXPOSE 5001

CMD ["yarn", "start"]