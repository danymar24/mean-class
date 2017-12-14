var express = require('express');
var routes  = express.Router();

var TodosController = require('./todosController');

routes.route('/')
    .get(TodosController.getTodos)
    .post(TodosController.createTodo);

routes.route('/:id')
    .get(TodosController.getTodo)
    .put(TodosController.updateTodo)
    .delete(TodosController.deleteTodo);

module.exports = routes;