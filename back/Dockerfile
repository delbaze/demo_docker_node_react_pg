FROM node:lts-alpine

RUN apk update && apk add bash git
RUN mkdir app
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

COPY tsconfig.json ./

RUN npm install

COPY database.sqlite ./

COPY src src

RUN git clone https://github.com/vishnubob/wait-for-it.git
CMD ["./wait-for-it/wait-for-it.sh" , "db:5433", "--" , "npm","start"]
# CMD ["./wait-for-it/wait-for-it.sh" , "db:5433","--timeout=5000", "--" , "npm","start"]
# CMD npm start