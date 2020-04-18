## Build
FROM node:13.12.0-alpine3.10 as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run ng-high-memory -- build --prod

FROM nginx:1.17.9-alpine
COPY --from=build /usr/src/app/dist/client /usr/share/nginx/html
