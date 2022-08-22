FROM node:16

WORKDIR /dashcord

COPY package.json ./
COPY yarn.lock ./
COPY . .


RUN yarn install
RUN yarn prisma migrate dev --name init

RUN yarn build

EXPOSE 3000

CMD ["yarn","start"]
