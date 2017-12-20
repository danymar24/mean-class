import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { HttpClient } from '@angular/common/http';
import { AlertsService } from '../../services/alerts.service';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  constructor(private http: HttpClient,
              private alertsService: AlertsService,
              private todosService: TodosService) { }

  ngOnInit() {
  }

  save(todoForm: NgForm) {
    this.http.post('/api/todos',
                   todoForm.form.value)
             .subscribe(res => {
               this.alertsService.pushAlert(res);
               this.todosService.pushTodo(todoForm.form.value);
               todoForm.reset();
             }, err => {
               this.alertsService.pushAlert(err);
             });
  }

}
