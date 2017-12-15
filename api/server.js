var express = require('express');
var app = express();
var bodyParser = require('body-parser');                 // New line
var mongoose = require('mongoose');                    // New line

var Routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));         // New line
app.use(bodyParser.json());                               // New line
mongoose.connect('mongodb://localhost:27017/mean-class'); // New line

app.use('/api', Routes);

app.listen(3050);
console.log('Api listening on port 3050');