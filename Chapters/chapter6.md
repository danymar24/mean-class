# Components

Angular is a component base framework this is created with TypeScript, Angular help us to create and mantain single page web applications.

A component is a logical piece of code where we can add logic, html code and styles.

A component consists of 2 parts: the component and the template.

Lets take our app component as example, we can open the file app.component.ts:

```javascript

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}

```

In the first line we import the component module from @angular/core.

Then we create the Angular component with @Component, it contains the selector, templateUrl and the styleUrls:

* selector: This is the name of the tag for the component, this is how its going to be called from the html files like: <app-root>Loading...</app-root>
* templateUrl and styleUrls: This defines the HTML template and the stylesheets associated with this component, you can also use inline templates and styles.

After the component decorator is the component class, this is the core of the component, inside of it we will write all the properties and methods for the logic of our app, the methods and properties in it can be accessed from the template.

## App structure

In our app we will write 2 components, the add-todo and todo-list, inside our add-todo we will use the POST method to create our todos on the api, in the todo-list we will use the GET method to get all todos, DELETE method to delete a todo and the PUT method to edit a todo.

First we will create our 2 components with the help of Angular CLI, we can run the commands:

```
ng generate component components/add-todo

ng generate component components/list-todos
```

Here we are telling angular cli to create a component inside the components folder, this will create a add-todo and a list-todos folders in the components folder.

Also this will create our typscript file, the html file, the css file and the spec.ts file.

Angular CLI will import our new components in the module file, so we can start using them, lets modify our file app.component.html:

```html

<h1>Todos list</h1>

<app-add-todo></app-add-todo>
<app-list-todos></app-add-todos>

```

Here we are using the components selectors to display our components in the app html.

You can run the app with ```ng serve```.

Continue to [chapter 7](chapter7.md).