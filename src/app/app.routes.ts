import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { EditComponent } from './components/edit/edit.component';

export const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
  },
  {
    path: 'form',
    component: TaskFormComponent,
  },
  {
    path: 'form/:id',
    component: TaskFormComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  },
];
