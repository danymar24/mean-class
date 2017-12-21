# Delete Todo

For the delete todo we dont have to change a lot of things, we just have to send a DELETE request to the api from our angular app, for this purpose we will use a button in our todo list, that button will call a function that is going to create the request we need, lets add the button to our list.

We want this button to be available for each Todo, so we will add it inside the ngFor loop:

```html

<div class="row">
  <ul class="list-group">
    <li class="list-group-item" *ngFor="let todo of todos | orderBy: 'createdAt': 'desc'; let i = index">
      <button class="btn btn-danger btn-small float-right" 
              (click)="deleteTodo(todo._id, i)">Delete</button>
      <span [innerHtml]="todo.text"></span>
      <span class="badge badge-primary float-right badge-pill" *ngIf="todo.done">Done</span>
      <span class="badge badge-secondary float-right badge-pill" *ngIf="!todo.done">Not done</span>
    </li>
  </ul>
</div>

```

Here we are just adding a button that calls to deleteTodo on click, we are passing 2 arguments, the todo id and the index, if you notice, in the for loop we added another statement, we added a variable i that equals to the index, with this we got the index of the todo we want to delete.

In the list-todos.component we need the function to delete the todo:

```typescript

  deleteTodo(id: string, index: number) {
    this.http.delete('/api/todos/' + id)
             .subscribe(res => {
               this.alertsService.pushAlert(res);
               this.todosService.removeTodo(index);
             }, err => {
               this.alertsService.pushAlert(err);
             });
  }

```

Here we are calling the http DELETE method, in the url we are adding the id of the todo, then we create the alert depending on the result.

If we run the application and click on the delete button we can see it is deleting the todos, but the todo is not being removed from the list, in the code we also added another line 

```this.todosService.removeTodo(index)```

With this line we will splice the todo from the todos list, in the todos.service under pushTodo we need to add this function:

```typescript

  removeTodo(index) {
    this.todos.splice(index, 1);
  }

```

Now run the application and see when we delete the todo it is also being removed from the list.

Continue to [chapter 13](chapter13.md).