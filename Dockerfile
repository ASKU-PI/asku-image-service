FROM node:14.17.5
ENV NODE_ENV=development

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --development

RUN mkdir uploads

COPY . .

CMD [ "node", "server.js" ]