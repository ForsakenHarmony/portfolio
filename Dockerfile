FROM top20/node:8-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
# Creating tar of productions dependencies
RUN npm install --production && cp -rp ./node_modules /tmp/node_modules
# Installing all dependencies
RUN npm install

COPY . ./

ENV NODE_ENV production
RUN npm run build

FROM top20/node:8-alpine AS runner

WORKDIR /app
ENV NODE_ENV production
EXPOSE 3000

# Adding production dependencies to image
COPY --from=builder /tmp/node_modules /app/node_modules

COPY . ./
# copy build
COPY --from=builder /app/public /app/public

CMD [ "node" ,"./bin/www" ]
