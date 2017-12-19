import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  save(todoForm: NgForm) {
    this.http.post('http:localhost:3050/api/users',
                   todoForm.form.value)
             .subscribe(res => {
               console.log(res);
             });
  }

}
