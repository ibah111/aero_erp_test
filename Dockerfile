FROM node:18-buster

RUN corepack enable

RUN apt-get update && apt-get install -y \
    build-essential \
    sqlite3 \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production

RUN echo "nodeLinker: node-modules" > .yarnrc.yml

WORKDIR /app

COPY package.json yarn.lock ./

RUN  yarn set version berry && yarn install

RUN echo 'JWT_SECRET="qDpUAh91PSQwcMAyOeGGj67ZwR6BVOIhllZ68gs+6x01DzVkuwX72RVFBrv2jExZ+wzpFP/aa3PVdhDD4CtiHw=="' > .env \
    && echo 'REFRESH_SECRET_KEY="/4n77Ri2gdXi4ZJ7J0nj6ha14SRpByTFDODHZUyBJ+gIll1yaD4hzg0V80qjLkNZfl/di0yF1cai4rWWHF0Rpw=="' >> .env \
    && echo 'SALT="10"' >> .env

COPY . .

RUN yarn add sqlite3

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:dev"]
