var express = require('express');
var router  = express.Router();

var TodosRoutes = require('./todos');

router.use('/todos', TodosRoutes);

module.exports = router;