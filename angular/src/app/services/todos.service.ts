import { Injectable } from '@angular/core';

@Injectable()
export class TodosService {
  todos: any;

  constructor() { }

  setTodos(todosList) {
    this.todos = todosList;
  }

  pushTodo(todo) {
    this.todos.push(todo);
  }
}
