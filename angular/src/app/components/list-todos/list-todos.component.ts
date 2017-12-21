import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodosService } from '../../services/todos.service';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private todosService: TodosService,
    private alertsService: AlertsService
  ) { }

  todos: any;

  ngOnInit() {
    this.http.get('/api/todos').subscribe(res => {
      this.todosService.setTodos(res);
      this.todos = res;
    });
  }

  deleteTodo(id: string, index: number) {
    this.http.delete('/api/todos/' + id)
             .subscribe(res => {
               this.alertsService.pushAlert(res);
               this.todosService.removeTodo(index);
             }, err => {
               this.alertsService.pushAlert(err);
             });
  }

}
