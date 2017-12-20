# Get todos

Now we will get all our todos list, to do this we will use the get method from the http module.

The get method is similar to the post method, we just need the HttpClient module imported on our component, then import it to the constructor and we can use it like this.http.get, in our application we can start using it, we will use it in our list-todos component:

```javascript

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // New line

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  constructor(private http: HttpClient) { }  // Modified line

  ngOnInit() {
    this.http.get('/api/todos').subscribe(res => {  // New lines
      console.log(res);
    });
  }

}

```

Here we are telling the get method to get all the information from /api/todos, then we are logging the response to the browser console, if you run the application you can see it logged an array with all the todos we created.

Now we can show them in a list, for this we will assign all the todos to a variable, and we can use the ngFor tag to display each todo, just like we did with the alerts:

```javascript

export class ListTodosComponent implements OnInit {

  todos: Array<Object>;

  constructor(private http: HttpClient) { }  // Modified line

  ngOnInit() {
    this.http.get('/api/todos').subscribe(res => { 
        this.todos = res;
    });
  }
}

```

Here we are declaring our todos variable of type array, then we set its value as the response we got from the api.

Now in the list-todos template we can write our ngFor remember we are using bootstrap, all the weird classes you see are for the bootstrap styles:

```html

<div class="row">
  <ul class="list-group">
    <li class="list-group-item" *ngFor="let todo of todos">
      <span [innerHtml]="todo.text"></span>
      <span class="badge badge-primary float-right" *ngIf="todo.done">Done</span>
      <span class="badge badge-secondary float-right" *ngIf="!todo.done">Not done</span>
    </li>
  </ul>
</div>

```

Here we are declaring an unordered list with bootstrap styles, and we are creating an ngFor loop over the todos variable, inside the list item we can se something new, we are using the *ngIf atribute, this attribute is provided by angular, it let us show or hide the html elements depending on the value we give, in this case we are showing the span tag containing the text "Done" if the todo done property is true, if it is false we are going to hide the "Done" span tag and it will show the "Not done" span tag.

Now run the application and create some todos with the done checkbox selected, reload the page and you will see the Done and Not done badge in our list.

As you can see you had to reload the page every time you created a new todo, this is not correct, so we will have to fix it, how can we update the list every time we create a new todo? Feel free to find your own implementation, we have covered all the necesary requirements to do it, anyways, we will cover it in the next chapter.

Continue to [chapter 10](chapter10.md).