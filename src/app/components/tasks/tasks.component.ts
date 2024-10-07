import { Component, effect, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { Task } from '../../interface/task';
import { error, log } from 'console';
import { Router, RouterLink } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { title } from 'process';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  TaskForm!: FormGroup;
  task: Task[] = [];

  loadData: any;
  constructor(private service: TodoService, private router: Router) {}
  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.service.getTasks().subscribe({
      next: (response: Task[]) => {
        this.service.Tasks.set(response);
        this.task = this.service.Tasks();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  DeleteTask(id: string) {
    this.service.DeleteTask(id).subscribe({
      next: () => {
        console.log('deleted successfully');

        this.getTasks();
      },

      error: (error) => {
        console.log(error);
      },
    });
  }
  EditTask(id: string) {
    this.service.getTask(id).subscribe({
      next: (response) => {
        console.log(response._id);
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.router.navigate(['/edit', id]);
  }
}
