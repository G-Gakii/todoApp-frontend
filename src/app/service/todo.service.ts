import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interface/task';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://todoapp-backend-mewv.onrender.com/api/task';
  Tasks = signal<Task[]>([]);
  task = signal({});
  taskformdata: any;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  taskForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['to-do'],
    });
  }

  getTasks() {
    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (res: Task[]) => {
        this.Tasks.set(res);
      },
    });
  }
  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }
  createTask(data: Task) {
    return this.http.post(this.apiUrl, data);
  }
  updateTask(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  DeleteTask(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // deleteTask = (id: string) => {
  //   this.http.delete(`${this.apiUrl}/${id}`).subscribe({
  //     next: (res) => {
  //       console.log(`deleted successfuly ${res}`);
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // };
}
