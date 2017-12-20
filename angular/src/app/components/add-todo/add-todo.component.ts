import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { HttpClient } from '@angular/common/http';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  constructor(private http: HttpClient, private alertsService: AlertsService) { }

  ngOnInit() {
  }

  save(todoForm: NgForm) {
    this.http.post('/api/todos',
                   todoForm.form.value)
             .subscribe(res => {
               this.alertsService.pushAlert(res);
             });
  }

}
