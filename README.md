
# NOTES MANAGER

## A light weight tool to take your notes
Sometimes you just want to take quick note and save it somewhere. This app helps you do just that
Try it out on the [here](https://onyango.herokuapp.com/)

## How to Install and Set it up
Clone the repo from GitHub:
```
$ git clone  https://github.com/jacksono/onyango.git
```

Navigate to the root folder of the repo:
```bash
$ cd onyango
```

Install the required packages:
```bash
$ npm install
```

You can add some dummy data
```bash
$ npm run seed
```

## How to run the APP
Run the command
```
$ npm start
```
This will open a browser window and the app will launch there.


To interact directly with the API you may use [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) for Google Chrome.

## API Endpoints

| Resource URL | Methods | Description | Requires Token || Payload       |
| -------- | ------------- | --------- |--------------- |--------------- |
| `/api/auth/register/` | POST  | User registration | FALSE | N/A   |
|  `/api/auth/signIn/` | POST | User login | FALSE |
|  `/api/notes` | POST | Change Username | TRUE |
| `/api/notes/` | GET | List user's notes | TRUE |
| `/api/notes/?q=all` | GET | List other users note titles | TRUE |
| `/api/notes` | POST | Create a note | TRUE |
| `/api/notes/<id>/` | GET | Get a single note | TRUE |
| `/api/notes/<id>/` | DELETE | Delete a single note| TRUE |
| `/api/notes/<id>/` | PATCH| Edit a single note | TRUE |


## How to test
To run the front end tests
```bash
$ npm test
```

To run the front end tests
```bash
$ npm run api-test
```

## Built With...
* REACT
* POSTGRESS
* EXPRESS
* NODE

## Credits and Licenses


Copyright (c) 2018 [Jackson Onyango](https://github.com/jacksono)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
