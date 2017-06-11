FROM node:7-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm i
COPY . ./

ENV NODE_ENV production
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run" ,"start" ]
