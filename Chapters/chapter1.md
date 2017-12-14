# Chapter 1

For this chapter we have to navigate to the application folder in the command promt(or terminal) using:

 ```cd path/of/the/project```

 Once we are on the folder we can continue to create the angular app.

## Angular app

First lets create the Angular application, for this we are going to use the angularcli application just run:

```ng new app```

This will generate the entire Angular application in the folder app.

We can run ```cd app && ng serve``` and visit http://localhost:4200 to test the application working.

## Express app

For the express app we have to create the folders manually, lets create the api folder aside of the app folder created by the angularcli command.

Inside of this folder we have to create the server.js file.

Now open a different command prompt and navigate to the same folder of the project.

First we have to initialize npm to start installing the packages:

Run ```npm init``` and fill the required fields.

Next we have to install Express.js so we have to run ```npm install --save express```.

once we have installed express we can start writing our api, to do this, we have to go to the server.js file and use this code

```javascript

var express = require('express');
var app     = express();

var router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to our api!'});
});

app.use('/api', router);

app.listen(3050);
console.log('Api listening on port 3050');

```

In first two lines we are importing the express framework and we are creating an app based on express, later we are using the express router to create our first route to the api, with ```res.json``` we are returning a json message to the client who made the request.

Then we are telling to the express app to use the port 3050.

Now we can run ```node server``` and go to http://localhost:3050/api/ to see it working, if everything is working fine we can see in our browser the json message from our api.