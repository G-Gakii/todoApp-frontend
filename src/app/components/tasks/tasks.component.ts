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
  tasks: Task[] = [];
  deleteTask: any;
  // isLoading = false;

  constructor(private service: TodoService, private router: Router) {}
  ngOnInit(): void {
    this.service.getTasks();
    this.tasks = this.service.Tasks();
  }

  DeleteTask(id: string) {
    for (let i = 0; i < this.tasks.length; i++) {
      this.tasks[i].isloading = false;
      if (this.tasks[i]._id === id) {
        this.tasks[i].isloading = true;
      }
    }

    this.service.DeleteTask(id).subscribe({
      next: () => {
        console.log('deleted successfully');
        // this.isLoading = false;

        this.tasks = this.tasks.filter((task) => task._id !== id);
        this.service.Tasks.set(this.tasks);
      },

      error: (error) => {
        console.log(error);
        // this.isLoading = false;
      },
    });
  }
  EditTask(id: string) {
    this.service.getTask(id).subscribe({
      next: (response) => {},
      error: (error) => {
        console.error(error);
      },
    });
    this.router.navigate(['/edit', id]);
  }
}
