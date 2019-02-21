[![Build Status](https://travis-ci.org/ogwurujohnson/Politico.svg?branch=develop)](https://travis-ci.org/ogwurujohnson/Politico)
[![Coverage Status](https://coveralls.io/repos/github/ogwurujohnson/Politico/badge.svg?branch=develop)](https://coveralls.io/github/ogwurujohnson/Politico?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/ad2335df87681d5065e3/maintainability)](https://codeclimate.com/github/ogwurujohnson/Politico/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ad2335df87681d5065e3/test_coverage)](https://codeclimate.com/github/ogwurujohnson/Politico/test_coverage)

# Politico

Politico enables citizens give their mandate to politicians running for different government offices while building trust in the process through transparency.

The application is hosted at [http://ogwurujohnson.github.io/Politico/UI/](http://ogwurujohnson.github.io/Politico/UI/)

## Application Features

The Application Programming Interface(API) and fully hosted application implements the following features for different users correspondingly.

##### Unauthenticated Users
- View the landing page
- View the all party page
- View all office page
- View Election Result page
- Register in the application
- Sign into the application

##### Authenticated Users
- Vie single office
- Vote Candidate
- View user profile
- Log out of the application

##### Admin Users
- Create Office
- Create Party
- Register Candidate
- Delete Party
- Delete a office


## Built With

* [Node js – A JavaScript runtime built on Chrome's V8 JavaScript engine ](https://nodejs.org/en/)
* [Express Js – Fast, minimalistic web framework for Node.js ](https://expressjs.com)
* [Postgresql – An open source database ](https://www.postgresql.org/)

## API
The API can be found, hosted here [https://better-politico.herokuapp.com/api/v1](https://better-politico.herokuapp.com/api/v1)

## API Documentation

The application server-side API documentation can be found in [http://better-politico.herokuapp.com/api/v1/api-doc](http://better-politico.herokuapp.com/api/v1/api-doc)

## Project Management

Development of the Politico application is managed with Pivotal Tracker, here [https://pivotaltracker.com/n/projects/2238975](https://pivotaltracker.com/n/projects/2238975)

## Getting Started

These instructions will get the politico application up and running on your local machine for development and testing purposes. See installation for notes on how to deploy the project on a live system.

### Prerequisites

The following applications are required to have politico up and running on your system.

```
Node 5+ – (Version 5 and above)
```
```
Editor – Sublime Text, Visual Studio Code or others
```
```
Postgres database manager – PgAdmin, Elephant SQL
```

### Installing the application

Take the following steps to get a development environment of Politico application running on you machine or server

Clone Politico application

On the root folder of the cloned application, add a .env file with required credentials following the .sample-env file pattern. This should contain the following

```
PORT = 
POSTGRES_DB_DEV = 
POSTGRES_DB_TEST = 
POSTGRES_USER  = 
POSTGRES_PASSWORD = 
POSTGRES_PORT = 
POSTGRES_HOST = 
EMAIL = 
EMAIL_PASSWORD = 
TOKEN_SECRET_WORD = 

SECRET = 

TRAVIS_HOST=
TRAVIS_USER=
TRAVIS_DATABASE=
TRAVIS_PASSWORD=
ELEPHANT_PORT=

```
Navigate to the root folder of the application
On command line, run the following commands
```javascript
npm install
npm run start
```
Test the individual routes using postman
End with an example of getting some data out of the system or using it for a little demo

### Running the application tests

In order to run tests cases for the routes, execute the following command
- Server side test
```javascript
npm run test
```

## Authors

* **Johnson Ogwuru** - (https://github.com/ogwurujohnson)