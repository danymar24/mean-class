var express = require('express');
var app     = express();

var Routes  = require('./routes');

app.use('/api', Routes);

app.listen(3050);
console.log('Api listening on port 3050');