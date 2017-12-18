# Adding external libraries

In this chapter we are going to add our Css framework, we will be using Bootstrap, to add bootstrap we need to import the Javascript file and the Css file.

First we need to install it running: 

```npm install bootstrap --save```

Next we need to import those files in the .angular-cli.json file.

Lets modify it like this:

```json

"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.min.css",
  "styles.scss"
]

```

For the Javascript side we will need a bootstrap weapper, this is needed to use the modals, accordion, datepicker, tooltips or any other component, for this we will use ngx-bootstrap, lets install it with:

```npm install ngx-bootstrap --save```

Once we have done this we have to import the components we will use, for now we will import the accordion and the alert in our app.module.ts file:

```javascript

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule, AccordionModule } from 'ngx-bootstrap';  // New line

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),     // New line
    AccordionModule.forRoot()  // New line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Look that we are importing the modules AlertModule and AccordionModule from the package ngx-bootstrap, then we are importing them with the forRoot method, this help us to add the modules to the entire application.

Now we can run our application, navigate to the angular folder with command prompt and run the app with:

```ng serve``` to se it working.

We can import more modules from ngx-bootstrap, they have all bootstrap components for angular, you can see the components here: [ngx-bootstrap](https://valor-software.com/ngx-bootstrap/#/getting-started).

If everything is working we can move to the [chapter 6](chapter6.md)