# FROM node:lts-alpine
# ENV NODE_ENV=production
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY . .
# RUN chown -R node /usr/src/app
# USER node
# CMD ["npm", "start"]


FROM node:lts-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:lts-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["npm", "start:prod"]