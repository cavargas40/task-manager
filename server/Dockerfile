#
# Production stage.
# This state compile get back the JavaScript code from builder stage
# It will also install the production package only
#
FROM node:13.13.0-stretch as intermediate

COPY package*.json ./
RUN npm ci
FROM node:13.13.0-stretch

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
COPY --from=intermediate ./node_modules /usr/src/app/node_modules

RUN npm run build
EXPOSE 4000
CMD ["node", "dist/"]