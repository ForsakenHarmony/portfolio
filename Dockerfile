FROM node:7-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN mkdir -p /public
RUN ln -s /public /usr/src/app/public
VOLUME /public

COPY package.json yarn.lock ./
RUN yarn install --no-cache --pure-lockfile
COPY . ./

ENV NODE_ENV production
RUN yarn build

# Remove dev dependencies
RUN yarn install --no-cache --pure-lockfile

EXPOSE 3000

CMD [ "yarn", "start" ]
