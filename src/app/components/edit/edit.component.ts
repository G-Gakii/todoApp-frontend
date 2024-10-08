import { Component, effect, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TodoService } from '../../service/todo.service';
import { log } from 'console';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  myId: string | null = '';
  taskForm!: FormGroup;
  editTask: any;
  isloading = false;

  constructor(
    private service: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.taskForm = this.service.taskForm();
    this.myId = this.route.snapshot.paramMap.get('id');
    if (this.myId) {
      this.service.getTask(this.myId).subscribe({
        next: (response) => {
          this.taskForm = new FormGroup({
            title: new FormControl(response.title),
            description: new FormControl(response.description),
            status: new FormControl(response.status),
          });
        },
      });
    }
  }

  UpdateTask() {
    this.isloading = true;
    if (this.myId) {
      this.service.updateTask(this.myId, this.taskForm.value).subscribe({
        next: (response) => {
          const currentTasks = this.service.Tasks();
          const updatedTask: any = currentTasks.map((task) =>
            this.myId === task._id ? response : task
          );
          this.service.Tasks.set(updatedTask);

          this.router.navigate(['']);
          this.isloading = false;
        },
        error: (error) => {
          console.log(error);
          this.isloading = false;
        },
      });
    }
  }
}
