# Frontend Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install && npm install react-scripts --save-dev
COPY ./src /app/src
COPY ./public /app/public

CMD ["npm", "start"]