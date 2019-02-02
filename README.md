# Politico
Politico enables citizens give their mandate to politicians running for different government offices while building trust in the process through transparency.

[![Build Status](https://travis-ci.org/ogwurujohnson/Politico.svg?branch=develop)](https://travis-ci.org/ogwurujohnson/Politico)
[![Coverage Status](https://coveralls.io/repos/github/ogwurujohnson/Politico/badge.svg?branch=ch-write-unit-test-163504250)](https://coveralls.io/github/ogwurujohnson/Politico?branch=ch-write-unit-test-163504250)
[![Maintainability](https://api.codeclimate.com/v1/badges/ad2335df87681d5065e3/maintainability)](https://codeclimate.com/github/ogwurujohnson/Politico/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ad2335df87681d5065e3/test_coverage)](https://codeclimate.com/github/ogwurujohnson/Politico/test_coverage)

### UI Templates
My UI templates can be found here: [ UI ](https://ogwurujohnson.github.io/Politico/UI)

### API Endpoints
Link of API Hosted on Heroku: 
[Link to API](https://better-politico.herokuapp.com/api/v1)

## Pivotal Tracker

Project is currently being managed with Pivotal Tracker, a project management tool. You can find the stories on the 
[Politico Pivotal Tracker Board](https://www.pivotaltracker.com/n/projects/2238975)

### Key Application Features
An admin can perform the following:
 - Admin (electoral body) can create political parties.
 - Admin (electoral body) can modify ​political parties
 - Admin (electoral body) can delete a political party.
 - Admin (electoral body) can create different ​political offices.
 - Admin (electoral body) can delete different ​political offices
 - Admin (electoral body) can modify different ​political offices
 - Users can sign up
 - Users can sign in
 - Users can vote for only one politician per ​political office​.
 - Users can see the results of election

 ### Development
This application was developed using NodeJs with express for routing.

### Compiler

* [Babel](https://eslint.org/) - Compiler for Next Generation JavaScript

### Installation

- Clone the repository.
- Run git clone (https://github.com/ogwurujohnson/Politico.git)
``` git clone https://github.com/ogwurujohnson/Politico.git ```

more info:
(https://help.github.com/articles/cloning-a-repository/)
- Run ``` npm install ``` to install the dependencies in the package.json file.

### Testing

- Navigate to the project location in your terminal.
- Run ``` npm test ``` to run the test.

### API Endpoints
<table>
  <tr>
    <th>HTTP VERB</th>
		<th>ENDPOINT</th>
		<th>FUNCTIONALITY</th>
		<th>EXAMPLE RESPONSE</th>
  </tr>
  <tr>
    <td> GET /parties </td>
    <td> /api/v1/parties </td>
    <td> Retrieves all parties </td>
    <td> {
      "status": 200,
      "data": [
                {
                    "id": 1,
                    "name": "Peoples Democratic Party",
                    "address": "Ikeja, Lagos",
                    "logo": "http://example.com/pdp"
                },
                {
                    "id": 2,
                    "name": "APC",
                    "address": "Abuja, Nigeria",
                    "logo": "http://example.com/apc"
                }
            ]
        }
    </td>
  </tr>
  <tr>
    <td>GET /parties/:id</td>
    <td>/api/v1/parties/:id</td>
    <td>Fetch a specific party</td>
    <td>{
      "status": 200,
      "data": [
          {
              "id": 1,
                "name": "Peoples Democratic Party",
                "address": "Ikeja, Lagos",
                "logo": "http://example.com/pdp"
          }
      ]
  }</td>
  </tr>
  <tr>
    <td>POST /parties</td>
    <td>/api/v1/parties/</td>
    <td>Creates a party</td>
    <td>{
      "status": 201,
      "data": [
          {
              "id": 3,
              "address": "No 235 ikorodu road",
              "name": "Councillor",
              "logo": "http://example.co"
          }
      ]
  }</td>
  </tr>
    <tr>
      <td>PATCH /parties/:id</td>
      <td>/api/v1/parties/:id</td>
      <td>Updates a specific party</td>
      <td>{
    "status": 201,
    "data": [
        {
            "id": 2,
            "name": "Councillor",
            "address": "No 21,nejhfeuhebwejbgwj",
            "logo": "http://logo.co"
        }
    ]
}
      </td>
    </tr>
    <tr>
      <td>DELETE /parties/:id</td>
      <td>/api/v1/parties/:id</td>
      <td>Deletes a specific political party</td>
      <td>{
    "status": 200,
    "data": [
        {
            "status",
            "data": "party successfully deleted"
        }
        
    ]
}
      </td>
    </tr>
    <tr>
      <td>GET /office/:id</td>
      <td>/api/v1/offices/:id</td>
      <td>Fetch a specific office</td>
      <td>{
    "status": 200,
    "data": [
        {
            "id": 2,
            "type": "State",
            "name": "Governor",
            "description": "Office of the Governor of Lagos State"
        }
    ]
}
      </td>
    </tr>
    <tr>
      <td>GET /offices</td>
      <td>/api/v1/offices/</td>
      <td>Fetch all offices</td>
      <td>{
        "status": 200,
        "data": [
            {
                "id": 1,
                "type": "Federal",
                "name": "President",
                "description": "Office of the president of the federal republic of Nigeria"
            },
            {
                "id": 2,
                "type": "State",
                "name": "Governor",
                "description": "Office of the Governor of Lagos State"
            }
        ]
    }
      </td>
    </tr>
    <tr>
      <td>PATCH /offices/:id</td>
      <td>/api/v1/offices/:id</td>
      <td>Updates a specific office</td>
      <td>{
    "status": 201,
    "data": [
        {
            "id": 2,
            "officeName": "Councillor",
            "officeType": "local",
        }
    ]
}
      </td>
    </tr>
    <tr>
      <td>DELETE /offices/:id</td>
      <td>/api/v1/offices/:id</td>
      <td>Deletes a specific political office</td>
      <td>{
    "status": 200,
    "data": [
        {
            "status",
            "data": "office successfully deleted"
        }
        
    ]
}
      </td>
    </tr>
    
   
</table>

### Technologies Used

- JavaScript (ES6) (http://es6-features.org/)
- Node.js (https://nodejs.org/en/)
- Express (https://www.npmjs.com/package/express-api)
- [Babel](https://eslint.org/) - Compiler for Next Generation JavaScript

### Author
- JOHNSON OGWURU

### License
- MIT License
