var express = require('express');
var router  = express.Router();

var TodosRoutes = require('./todos');

router.use('/users', TodosRoutes);

module.exports = router;