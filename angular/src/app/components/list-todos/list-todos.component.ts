import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  constructor(private http: HttpClient, private todosService: TodosService) { }
  todos: any;

  ngOnInit() {
    this.http.get('/api/todos').subscribe(res => {
      this.todosService.setTodos(res);
      this.todos = res;
    });
  }

}
