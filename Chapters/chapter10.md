# Sharing data between components

To share data between components we need a service, we already do this in the chapter 9, with the alerts, if you remember we created a alerts service, in this service we have the alerts, we push alerts withe our add todo component and we show them in the app component.

Here we are going to create a service to share data between the add component and the list component, so when we create a new todo, the saved todo has to be pushed to the list component.

Lets create our new service with angular cli: 

```ng generate service services/todos```

In our new service we will create 2 methods, the setTodos, and the pushTodo, lets write the following code to it:

```javascript

import { Injectable } from '@angular/core';

@Injectable()
export class TodosService {
  todos: any;               // New Line

  constructor() { }

  setTodos(todosList) {     // New Lines
    this.todos = todosList;
  }

  pushTodo(todo) {
    this.todos.push(todo);
  }
}

```

Here we all have to do is assign the todosList received on the function to a new variable called todos, in the pushTodo function we are pushing the new todo to the todos array.

Before pushing the new todos to the list, lets push all the todos list to the service, this can be done in the list todos component (Dont forget to import our new service to the app module):

```javascript

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodosService } from '../../services/todos.service';                    // New line

... // Some lines skipped

export class ListTodosComponent implements OnInit {

  constructor(private http: HttpClient, private todosService: TodosService) { } // New import
  todos: any;

  ngOnInit() {
    this.http.get('/api/todos').subscribe(res => {
      this.todosService.setTodos(res);                                          // New line
      this.todos = res;
    });
  }

}

```

In the get function we have added one line, we are passing the response of the get method to the setTodos function of our service.

Now we can start pushing the new todos to the list, in the add todo component you can use the pushTodo function (Dont forget to import the service in the add component):

```javascript

  save(todoForm: NgForm) {
    this.http.post('/api/todos',
                   todoForm.form.value)
             .subscribe(res => {
               this.alertsService.pushAlert(res);
               this.todosService.pushTodo(todoForm.form.value); // New line
               todoForm.reset();                                // New line
             }, err => {                                        // New line
               this.alertsService.pushAlert(err);               // New line
             });
  }

```

Here we have changed the subscribe method, if you see now is accepting two parameters, the success callback and the error calback, this is because we want to push the saved todo only if it was succesfully pushed, if there was an error we want to show only the alert.

Also we are using the reset() function on the todo form when it was successfully created, this is going to clear all the fields of our form.

Now run the application, create a new todo and look that it is being added to the end of the list.

In the next chapter we will see how we can sort the todos by created date.

Continue to [chapter 11](chapter11.md)