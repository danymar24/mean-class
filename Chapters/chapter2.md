# Chapter 2: Express.js routes.

In this chapter we are going to focus on the express.js api, we are going to create the express file structure, the routes, and some functions to do some basic stuff with the routes.

Lets start moving our route to a new file.

## Modules

To create routes we can create a new module, node modules are files that exports variables or objects using ```module.exports```, lets create a new folder in our api folder, inside that folder we are going to create a index.js file.

The structure for now would be:

```

|-- angular
|-- api
    |-- server.js
    |-- node_modules
    |-- routes
        |-- index.js

```

Inside the index.js file we will write our routes module, in this file we will include all the routes we need, in this class we will use the TODOS routes, but you can include all the routes you want as users, profiles, etc.

Lets write our routes module writing the next code on the routes/index.js file:

```javascript

var express = require('express');
var router  = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to our api!'});
});

router.use('/', router);

module.exports = router;

```

As you can see we need to require express, we are using the express router so we declare it in a var router, then we paste the first route we created in the chapter 1, then we use tell router to use the route.

At the end of the code we export our router variable as a module.

Now delete the route of the server.js file and include our new module.

```javascript

var express     = require('express');
var app = express();

var Routes = require('./routes');

app.use('/api', Routes);

app.listen(3050);
console.log('Api listening on port 3050');

```

Now run the api server with ```node server``` and verify that the api is working as before.

## TODO routes

For our TODO's routes we will create another module this is going to be called todos, in this module we will create 5 routes, get, getOne, save, edit, and delete.

For this module we will need the TODO's routes, and the controller. 

Lets create a new folder called ```todos``` and a file called index.js and another one called todosController.js

The folder structure should be like this now:

```

|-- angular
|-- api
    |-- server.js
    |-- node_modules
    |-- routes
        |-- index.js
        |-- todos
            |-- index.js
            |-- todosController.js

```

In the index.js file lets import express and create the routes:

```javascript

var express        = require('express');
var router         = express.Router();

var TodosController = require('./todosController');

router.route('/')
    .get(TodosController.getTodos)
    .post(TodosController.createTodo);

router.route('/:id')
    .get(TodosController.getTodo)
    .put(TodosController.updateTodo)
    .delete(TodosController.deleteTodo);

module.exports = router;

```

In this file we are importing the todos controller, then we are telling to the router valiable that it is going to contain the route '/' with the get and post method and when a request is received it uses the functions from the TodosController.

Then in the second route we are using the route '/:id', :id is the parameter sent by the client, for example when we send a get request to http://localhost:3050/api/todos/234, it is going to get only the todo with id 234.

Now we can create the controller, lets type the following code:

```javascript

module.exports = {
    getTodos: (req, res) => {
        res.json({ message: 'Getting all the todos' });
    },
    getTodo: (req, res) => {
        res.json({ message: 'Getting one todo' });
    },
    createTodo: (req, res) => {
        res.json({ message: 'Creating one todo' });
    },
    updateTodo: (req, res) => {
        res.json({ message: 'Updating todo' });
    },
    deleteTodo: (req, res) => {
        res.json({ message: 'Deleting todo' });
    }
};

```

Here we are exporting one module that contains all the functions we can use in our todos routes module.

The only thing remaining is update our routes module:

```

var express = require('express');
var router  = express.Router();

var TodosRoutes = require('./todos');

router.use('/users', TodosRoutes);

module.exports = router;

```

Now if we run node server again and make requests to http://localhost:3050/todos, we should see the messages in the response.

In the next chapter we will cover how to connect to the mongo database and how to create the todo model and start modifing them.

Continue to [Chapter 3](chapter3.md).