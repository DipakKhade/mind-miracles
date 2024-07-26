FROM node:latest

WORKDIR /

COPY package.json ./

COPY . .

RUN npm install 

RUN npm install serve

RUN npm run build

CMD ["npx", "serve", "-s", "dist"]