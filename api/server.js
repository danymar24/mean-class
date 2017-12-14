var express = require('express');
var app     = express();

var router  = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to our api!' });
});

app.use('/api', router);

app.listen(3050);
console.log('Api listening on port 3050');