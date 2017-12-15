# Express.js and the Mongo database

In this chapter we will be connecting our application to the mongo database, to do this we will be using Mongoose to create the models and the connection to the database, first we have to run the mongod server, if you added the mongodb path to the global variables in the terminal you can simply run ```mongod``` from any folder.

Once the mongod server is running open a new command prompt on the project folder, then change to the api diretory and run: ```npm install --save mongoose```.

## Mongoose

Mongoose is a mongodb tool to write schema-based models for our application, validation, query building hooks and more.

In this project we will be using it to crete our models.

Lets start creating a new todo model on the api todos folder, lets create a javascript file called todoModel.js, inside of it we will add the next code:

```javascript

var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var TodoSchema = new Schema({
    text: String,
    done: Boolean
});

module.exports = mongoose.model('Todo', TodoSchema);

```

In this code we are importing the mongoose package, if you see we are declaring a TodoSchema, a schema is a organizational pattern or structure, it help us to define the values of our todo like the text and the value done, it also allows us to define types to them.

At the end we are importing a mongoose model called 'Todo' based on our todo schema.

Now we have to connect our api aplication to the mongo server, we can now go to the server.js file, then we can add the following code:

```javascript

var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');                 // New line
var mongoose    = require('mongoose');                    // New line

var Routes      = require('./routes');

app.use(bodyParser.urlencoded({extended: true}));         // New line
app.use(bodyParser.json());                               // New line
mongoose.connect('mongodb://localhost:27017/mean-class'); // New line

app.use('/api', Routes);

app.listen(3050);
console.log('Api listening on port 3050');

```

Here we imported mongoose to our server and then created the mongoose connection, the ```mongoose.connect``` command accepts the mongodb url as parameter, for now we are using our local mongo database but we can use one in another server, then we are telling mongo that we are using the database mean-class. 

Also we have imported another package, the bodyParser package, it will help us to translate the requests so we can handle them easily, lets install it typing on our command promt ```npm install --save body-parser```.

## getTodos route

Now lets import our model in our todosController, then we can create the logic for our get todos route, lets modify our getTodos method and write the next code:

```javascript

getTodos: (req, res) => {
    Todo.find((err, todos) => {
        if(err) return res.status(404).send(err);

        return res.json(todos);
    });
}

```

As we are using a mongoose model it will made our life easy, we just have to use the Todo.find function and mongoose will make the call to the database, it will get all the todos we have stored then we send it as json type.

Here we can use 2 parameters, we can use an object to make some query and the callback function.

Now we can test our route to see everything is working fine, for testing purposes we are going to use postman from now on, if we run our application and go to postman and create a get request to ```http://localhost:3050/api/todos``` we are going to receive an empty array, this is because we dont have any data in the database.

## getOne route

For our getOne route we can use our find method from mongoose, for example we can use:

```javascript

Todo.find({ _id: 'some id' }, ourCallbackFunction());

```

But mongoose and mongo make our life easier, so we will use the ```findById``` mongoose method and the bodyparser, lets modify our getTodo route like this:

```javascript

getTodo: (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(err) return res.status(404).send(err);

        return res.json(todo);
    });
}

```

If you see we pass two parameters to the ```findById``` method, req.params.id is the id we passed in the route.

## createTodo route

To test this route we need data, we need to insert some data to our database, to do this we will modify our createTodo route.

Again mongoose makes everything easy for us, we only have to use the save method like this:

```javascript

createTodo: (req, res) => {
    var todo = new Todo(req.body);

    todo.save((err) => {
        if(err) return res.send(err);

        return res.json({ message: 'Todo created' });
    });
}

```

Here something looks a bit different, if you look we are using the save method from the todo variable, this is because we are telling that todo is a variable with the Todo containing the data we got from the request, then we just have to send a message that we have created the todo.

To test this route we can go to postman, create a new POST request to http://localhost:3050/api/todos/, in the tab Body we have to select the type x-www-form-urlencoded, then in the form we can fill the values we need (the ones we declared on the schema) and click send, we should receive the Todo created message.

But here we have one problem, lets send a POST request with no data, as you can see we created a todo without data, we can avoid this modifying our mongoose schema, lets modify it like this:

```javascript

var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var TodoSchema = new Schema({
    text: {             // Modified line        
        type: String,   // Modified line                    
        required: true  // Modified line                    
    },                  // Modified line    
    done: Boolean
});

module.exports = mongoose.model('Todo', TodoSchema);

```

If we make the same request without data we will receive an error, and we will receive it until we fill the required fields.

## updateTodo route

What happens if we want to edit some todo? in this case we can use the same save method but with a different approach, lets modify our updateTodo route with this code:

```javascript

updateTodo: (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (err) return res.send(err);

        todo.text = req.body.text;
        todo.done = req.body.done;

        todo.save((err) => {
            if (err) return res.send(err);

            res.json({ message: 'Todo updated' });
        });
    });
}

```

Here if you se we are finding one todo by its id, then we are assigning the information recevied in the body to the todo found, then we are saving the found todo with the save method.

Now you can run again the aplication and send a put request to any todo, just change the values.

## deleteTodo route

Last but not least mongoose is comming to our rescue again, when we have an unwanted todo we can delete it easily, if you remember we are passing the id parameter to our delete route, so we can use the delete method of mongoose, lets modify the deleteTodo route:

```javascript

deleteTodo: (req, res) => {
    Todo.remove({
        _id: req.params.id
    }, (err, todo) => {
        if (err) return res.send(err);

        return res.json({ message: 'Todo deleted'});
    });
}

```

As you can see in here we are passing an object to the remove method with the value of _id and the id received in the parameters, then we return a message of success.

To test this route we can just send a DELETE request with the id of the todo we want to delete, for example: http://localhost:3050/api/todos/12345.

There are a lot of thing we can do with express and mongoose, in the next chapter we will move all our configuration variable to another file, so we have a cleaner aplication.

Continue to [chapter 4](chapter4.md).