import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  constructor(private http: HttpClient) { }
  todos: any;

  ngOnInit() {
    this.http.get('/api/todos').subscribe(res => {
      this.todos = res;
      console.log(res);
    });
  }

}
