# Tasks Manager Client
![](https://img.shields.io/badge/task--manager--client-build-green.svg)
![](https://img.shields.io/badge/node.js-v13.7.*-blue.svg) 
![](https://img.shields.io/badge/npm-v6.13.*-blue.svg)
![](https://img.shields.io/badge/angular--cli-v9.1.*-orange.svg)

### Ng Client using GraphQL Server for ZagaLabs Test

## Dependencies
##### To install dependencies run:
```sh
npm install
```

## Development
- All configurations are stored in `environments/environment` 
##### To start the development server run:
```sh
ng serve -o
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Usage
#### just open your favorite browser and navigate to this url to open the Angular App:
> http://localhost:4200


## Docker Image
#### If you dont want to run a development local server, just execute this command to download the docker image(Docker Required):
> docker pull cavargas40/task-manager-client:v1.0.0

### after the pull image run this command:
> docker run --name task-manager-client -p 80:80 -d cavargas40/task-manager-client:v1.0.0
> http://localhost


## Author
> Carlos Andres Vargas Lopez | <https://www.cavargas.com/> | <cavargas40@gmail.com>
