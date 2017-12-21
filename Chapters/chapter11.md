# Sort todos

To sort the todos we will do it from the api and the angular app, this is usefull because we can learn how to do sorting with mongoose and how to use the filters in angular, first lets modify our getTodos route of our api, go to the todosController file and modify the getTodos method:

```javascript

getTodos: (req, res) => {
    Todo.find().sort('-createdAt').exec((err, todos) => {
        if (err) return res.status(404).send(err);

        return res.json(todos);
    });
},

```

As you can see here we have modified the code, we added the sort function and passed the "-created" string, notice the "-" with this we are sorting by descending date, also we are using the exec method, this method is going to be executed when the other methods finishes, in this case its going to execute when the find and sort finishes, now we have to modify our createTodo method to add the date when we are creating the todos:


```javascript

createTodo: (req, res) => {
    req.body.createdAt = new Date();        // New line
    var todo = new Todo(req.body);

    todo.save((err, created) => {
        if (err) return res.send(err);

        return res.json({ 
            message: 'Todo created', 
            created: created 
        });
    });
},

```

Here we are asigning a new Date() to the createdAt on the body of the request.

Notice we have also added a new parameter to the todo.save function, we have added the created parameter, when we save a record with mongoose, it will return 2 values, the error and the created record, for our purpose, we will return the created record to the angular app, this is because when we create the records we will need the id and the createdAt.

Here we are pushing an incomplete created todo to the todosList, we are missing the id and the createdAt, we have to modify our add todo component, in the save function lets modify the pushTodo function like:

```javascript

save(todoForm: NgForm) {
    ... // Some lines skipped

    this.todosService.pushTodo(res.created); 

    ... // Some lines skipped
}

```

Now if you notice when we create new todos they will be added at the bottom of the list, we need the sorting in the angular app, for this we need a pipe, we will need to create it with the logic to sort our todos.

## Pipes

The pipes are used to transform data, we use them when we need to transform data in a template, for example in our aplication we want to transform the array of Todos, and we want to sort them by creation date. We can use angular cli to create our order pipe, in command prompt inside the angular folder type:

``` ng generate pipe pipes/orderBy ```

This will create the pipe ```orderBy``` inside the pipes folder.

Inside the file order-by.pipe.ts we can find the following code:

```typescript

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(value: any, args?: any) {
    return null;   
  };
}

```

This pipe is composed by the @Pipe decorator, it needs a name, in this case is orderBy, then we define the OrderByPipe class.

Inside the pipe class we have the transform function, in this function we are passing the value, this value is the one we assign in the template, the args are the arguments, we can pass any arguments we need.

In our case we will be using lodash to sort our Todos, we can install it with: ```npm install --save lodash```.

Then we need to modify our pipe to use lodash, like this:

```typescript

import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';                   // New line

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform = orderBy;                              // New line

}

```

Here we are importing the orderBy function from lodash, this will help us to reduce a lot of work for our pipe, then we are assigning this function to our pipe transform.

If we run our application we can see nothing has changed, we can still add the todos but it is still adding them at the bottom, this is because we are using a stateless pipe, angular by default sets the pure property to them, we need to change it to use a stateful pipe, lets modify our pipe:

```typescript

@Pipe({
    name: 'orderBy',
    pure: false
})

```

With this change we have converted our pipe to be a stateful pipe.

Now we can start using our pipe in the template, in our list todos template we will use it in the for loop:

```html

<div class="row">
  <ul class="list-group">
    <li class="list-group-item" *ngFor="let todo of todos | orderBy: 'createdAt': 'desc'">
      <span [innerHtml]="todo.text"></span>
      <span class="badge badge-primary float-right" *ngIf="todo.done">Done</span>
      <span class="badge badge-secondary float-right" *ngIf="!todo.done">Not done</span>
    </li>
  </ul>
</div>

```

Here in the ngFor loop we have modified the statement like: ```let todo of todos | orderBy: 'createdAt': 'desc'```, we are telling to the pipe to order our array by the createdAt field, in descendent order.

Now if we run our application we can start adding new todos and see how they are being added at the top of the list, this is because it will sort by the newest first.

Continue to [chapter 12](chapter12.md).