# Tasks Manager Server
![](https://img.shields.io/badge/task--manager--server-build-green.svg)
![](https://img.shields.io/badge/node.js-v13.7.*-blue.svg) 
![](https://img.shields.io/badge/npm-v6.13.*-blue.svg)
![](https://img.shields.io/badge/yarn-v1.2.*-blue.svg)

### GraphQL API for ZagaLabs Test

## Dependencies
##### To install dependencies run:
```sh
npm install
# or
yarn install
```

## Development
- All configurations are stored in `.env`, because this is a test project, is not required to copy the content of `.env.example` into `.env` 
##### To start the development server run:
```sh
npm start
# or
yarn start
```

## Testing
- To run the tests just execute the next command
```sh
npm run test
```

## Usage
#### just open your favorite browser and navigate to this url to open the GraphQL Playground:
> http://localhost:4000


## Docker Image
#### If you dont want to run a development local server, just execute this command to download the docker image(Docker Required):
> docker pull cavargas40/task-manager-server:v1.0.1

### after the pull image run it in the root of the project with the command:
> docker run --env-file=.env --name task-manager-server -p 4000:4000 -d cavargas40/task-manager-server:v1.0.1


## Author
> Carlos Andres Vargas Lopez | <https://www.cavargas.com/> | <cavargas40@gmail.com>