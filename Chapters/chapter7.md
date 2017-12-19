# Add Todo component

In this chapter we will write our add component, we already have the files we need, but we have to write the logic to start creating todos with our app and our api, to do this, Angular provides us the http module, the one who can make http requests like the ones we are going to use: POST, GET, PUT and DELETE.

First we have to import the http module in our app.module also we are going to import the forms module to made the forms development easier with angular:

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule, AccordionModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';            // New line
import { HttpClientModule } from '@angular/common/http'; // New line


import { AppComponent } from './app.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { ListTodosComponent } from './components/list-todos/list-todos.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTodoComponent,
    ListTodosComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    AccordionModule.forRoot(),
    FormsModule,                    // New line
    HttpClientModule                // New line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Now we can use the http and the forms module in our application, lets go to our add todo component and import the required components we need to write our add todo page.

The add todo page will be composed by a form, the one in what we will log our todo information, then when we click the Save button it will create the POST request to our api.

In our add page component write the next lines:

```javascript  

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form'; // New line
import { HttpClient } from '@angular/common/http';              // New line

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  constructor(private http: HttpClient) { } // New import

  ngOnInit() {
  }

  save(userForm: NgForm) {              // New lines
      console.log('Form submitted');
  }

}

```

First we imported the NgForm class and the HttpClient from angular, then in the constructor we added the HttpClient as a dependency, we stored it in a variable called http, this has to be done so we can use the http methods on our component.

Then we created the save function, this function will be called from the template, and we are passing the parameter userForm and its type is NgForm.

For now we will be logging the text ```Form submitted```.

Now we will add the html code of our form to the add todo component template, remember we can now use bootstrap to our templates.

```html

<form #todoForm="ngForm" 
      (ngSubmit)="save(todoForm)">
    <div class="row">
        <div class="col-md-10">
            <div class="form-group">
                <input class="form-control" 
                       placeholder="Text" 
                       type"text" 
                       name"text" 
                       ngModel>
            </div>
        </div>
        <div class="col-md-1">
            <div class="form-check">
                <label class="form-check-label">
                    <input class="form-check-input" 
                           type="checkbox" 
                           name="done" 
                           ngModel>
                    Done
                </label>
            </div>
        </div>
        <div class="col-md-1">
            <button class="btn btn-primary"
                    type"submit">
        </div>
    </div>
</form>

```

In this code we are creating a form named todoForm, and it's going to be of the type ngForm, then if we submit this form we will call the save function and pass the todoForm to this function.

We are adding two input fields, the text and the done fields, but something looks weird in this inputs, we are giving the attribute ngModel, why? Because Angular is intelligent, if we dont give any parameters to the ngModel attribute, it is going to take the name attribute as the model name, then it's going to assign it to the our form.

Lastly we are creating the button, it has to be of type submit so we can use it with our form.

Run the application to see if it works, at this moment the form will not do anything else than log a text on the browser terminal, if it is logging the text it means the template has access to the component scope and we can start writing the logic to add the todos.

Now in the component file we can call to the http.post method lets write the next code in the save function:

```javascript

save(todoForm: NgForm) {
    this.http.post('http://localhost:3050/api/users', todoForm.form.value.name)
             .subscribe(res => {
                console.log(res);    
             };
}

``` 

Here we are passing a NfForm type form to the save function, we can get the values of the form with ```todoForm.form.value```.

The angular POST method accepts 2 parameters, the url and the data we want to send to the api.

We have to subscribe to the response, that is why we call the subscribe function and pass the response as callback.