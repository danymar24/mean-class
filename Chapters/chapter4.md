# Angular

At this point we have a functional api, we can add, modify, find and delete our todos, now we need a GUI to do that, from now on we are going to build our angular application to do those things.

We are going to do multiple things like:
* Use a CSS framework to build our UI
* Build Angular components
* Connect our Angular app to our API
* Etc.

## App structure

Right now our application structure is as follows: 

```

|-- angular
    |-- .angular-cli.json
    |-- package.json
    |-- tsconfig.json
    |-- src
        |-- app
        |-- assets
        |-- environments
        |-- index.html
        |-- main.ts
        |-- styles.scss
        |-- tsconfig.app.json
|-- api
    |-- server.js
    |-- node_modules
    |-- routes
        |-- index.js
        |-- todos
            |-- index.js
            |-- todosController.js

```

Lets focuse on the angular folder, we have a folder called src, this folder contains our entire application, in the index file we have our main html structure, in there we have our app-root tag, angular is going to render our application inside of it.

The file .angular-cli.json we have our angular configuration, here we can add external scripts or styles, we are going to use this file to add the CSS framework.

The tsconfig.json file contains the typescript configuration for our project.

Inside the src file we have a folder called app, this folder is the one we will use to write all the components we need for our application.

Inside the app folder we have one module and one component, the angular module is the one wich will have all the package imports, we can import external libraries, components, services, directives, etc.

In the next chapter we will begin adding the configuration we need.

Go to [chapter 5](chapter5.md).

