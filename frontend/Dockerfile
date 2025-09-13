FROM node:latest-alpine AS build

WORKDIR /frontend

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:latest-alpine AS final

COPY ./build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
