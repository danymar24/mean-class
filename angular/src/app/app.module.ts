import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule, AccordionModule } from 'ngx-bootstrap';


import { AppComponent } from './app.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { ListTodosComponent } from './components/list-todos/list-todos.component';


@NgModule({
  declarations: [
    AppComponent,
    AddTodoComponent,
    ListTodosComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    AccordionModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
