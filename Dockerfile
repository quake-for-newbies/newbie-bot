FROM node:22-alpine

WORKDIR /app

COPY src ./src
COPY package.json .
COPY tsconfig.json .

RUN npm install
RUN npm run build

ENTRYPOINT ["npm", "run", "start"]
