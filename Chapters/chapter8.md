# Services

Somethimes we will want to share data between components, the best way to do it in angular is trough services, now we have an excelent oportunity to learn about them in our application.

Now we are creating todos with our application, we receive the success message or error message and we can see it on the browser console, but this is not the best way to show it to the users, in this chapter we will create alerts that shows to the users the response, if its a success or an error.

For this we need a service, in this service we will store the alerts we receive from the api, lets create a service with angular cli, just type in your command promt inside the angular folder: ```ng generate service services/alerts```.

With this command we are telling angular cli to create a service called alerts inside the services folder.

So our folder structure should be like:

```

|-- angular
    |-- ...
    |-- src
        |-- app
            |-- components
            |-- services
                |-- alerts.service.ts
                |-- alerts.service.spec.ts
        |-- ...

```

This will create the file alerts.service.ts:

```javascript

import { Injectable } from '@angular/core';

@Injectable()
export class AlertsService {
  constructor() { }
}

```

This file require we import the Injectable from the angular core, then we use the @Injectable decorator to tell angular this is a service we can inject in our components, then we have the AlertsService class, and inside the service we can write the methods we need.

Our alerts will be shown on top of our app, so we will use the ngx-bootstrap alerts component to show our alert, this will help us to save time writing the styles.

First lets import our service on our module:
```javascript

... // Some lines skipped

import { HttpClientModule } from '@angular/common/http';

import { AlertsService } from './services/alerts.service'; // New line

import { AppComponent } from './app.component';

... // Some lines skipped

imports: [
    ... // Some lines skipped
],
providers: [AlertsService] // New line
bootstrap: [AppComponent]

... // Some lines skipped

```

In the app component template lets write the ngx-bootstrap component:

```html

<div class="container">
    <h1>Todos list</h1>
    <div *ngFor="let alert of alerts">
        <alert [type]="alert.type" 
               [dismissible]="true"
               dismissOnTimeout="5000"> 
            <span [innerHtml]="alert.message"></span>
        </alert>
    </div>
    <app-add-todo></app-add-todo>
    <app-list-todos></app-list-todos>
</div>

```

As you can see we are using *ngFor, this is because we are going to use an array to store all our alerts, ngFor will loop trough our array alerts and it will take each element as alert, this is declared with let alert for alerts.

The ngx-bootstrap component is used with <alert>, we are assigning the color with the [type] and we want to be able to close, so we will show the close button with [dismissible]="true" anyways the alert will dissapear at 5 seconds, we can change the time in dismissOnTimeout="5000", where the time is given in miliseconds.

Now we need to declare the alerts array on our service, we have to modify it:

```javascript

import { Injectable } from '@angular/core';

@Injectable()
export class AlertsService {
  alerts: Array<Object> = [];           // New line
  constructor() { }

  pushAlert(alert) {                    // New lines
    const newAlert: Object = {
      type: alert.errors ? 'danger' : 'success',
      message: alert.message
    };
    this.alerts.push(newAlert);
  }
}

```

Here we are declaring an array called alerts of type Array and each array element is of type object.

We are declaring a function called pushAlert, this function will accept one object, this object is our response from our api, this will contain the message or errors, if we have errors we are declaring the type of the alert as danger, if it does not contains errors we declare the type as success.

Then we push our new alert to the alerts array of this service.

Now we have our alerts service, we need to get those alerts in our app.component:

```javascript

import { Component } from '@angular/core';
import { AlertsService } from './services/alerts.service'; // New line

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  alerts: Array<Object> = this.alertsService.alerts;       // New line
  constructor(private alertsService: AlertsService) { }    // New line
}

```

Here we are importing our alertsService on our app constructor, then we are assigning the value of our alertsService.alerts to a variable alerts, in this way we can access our alerts from our template.

Till this point if we run our app we can see everything is working, but we cant see any alert, this is because we dont have any, we have to create alerts, we want to show the alerts when we have an api response, so lets create alerts with our service every time we create a todo, lets go to the add todo file, dont forget import our service and modify the save function like this:

```javascript

save(todoForm: NgForm) {
    this.http.post('/api/todos',
                   todoForm.form.value)
             .subscribe(res => {
               this.alertsService.pushAlert(res); // New line
             });
  }

```

Here we are calling our alertsService pushAlert method, we are passing the response.

Now if you run the application and save a todo you can see an alert showing at the top of the page saying Todo created. If you try to save an empty todo you will get an error alert saying the error.

In this chapter we used the ngFor and the services, we are going to use them again in later chapters, so feel free to research more about them, also you can enhance our application.

Continue to [chapter 9](chapter9.md).