import { Component, effect, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { Task } from '../../interface/task';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { log } from 'console';
import { response } from 'express';
import { title } from 'process';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  mytask: Task[] = [];
  addingTask = false;

  constructor(private service: TodoService, private router: Router) {}
  ngOnInit(): void {
    this.taskForm = this.service.taskForm();
  }

  AddTask() {
    this.addingTask = true;
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      this.service.createTask(formData).subscribe({
        next: (response: any) => {
          console.log('data submitted successfully', response);
          this.service.Tasks.set([...this.service.Tasks(), response]);
          this.addingTask = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error occurred while submitting data:', error);
          this.addingTask = false;
        },
      });
    } else {
      alert('Task field required');
    }
  }
}
