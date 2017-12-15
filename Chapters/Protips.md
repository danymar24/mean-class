# Protips

## Nodemon

It is boring and annoying when we have to reload the api applications every time we made a change, to avoid this we can use the package nodemon.

To use it you only have to install it with ```npm install -g nodemon```, then you only run the application with ```nodemon yourappfile.js```, nodemon will restart the application every time it detects a file change.

You can also create a hook in the package.json to use it, for example you can add in our api application in the file package.json inside the scripts object: ```"start": "nodemon server.js",``` then run the api aplication with npm start.