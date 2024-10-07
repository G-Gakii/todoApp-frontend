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
  mytask: any;

  constructor(private service: TodoService, private router: Router) {}
  ngOnInit(): void {
    this.taskForm = this.service.taskForm();
  }

  AddTask() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      this.service.createTask(formData).subscribe({
        next: (response: any) => {
          console.log('data submitted successfully', response);
        },
        error: (error) => {
          console.error('Error occurred while submitting data:', error);
        },
      });
      this.router.navigate(['/']);
    } else {
      alert('Task field required');
    }
  }
}
