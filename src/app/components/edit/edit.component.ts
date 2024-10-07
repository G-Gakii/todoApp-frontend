import { Component, effect, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TodoService } from '../../service/todo.service';
import { log } from 'console';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  title = '';
  description = '';
  status = '';
  id = '';
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
          this.taskForm.patchValue(response);
        },
      });
    }
  }

  UpdateTask() {
    if (this.myId) {
      this.service.updateTask(this.myId, this.taskForm.value).subscribe({
        next: (response) => {
          console.log('data updated successfully', response);
          this.router.navigate(['']);
        },
      });
    }
  }
}
