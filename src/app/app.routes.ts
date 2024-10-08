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
    loadComponent: () =>
      import('./components/task-form/task-form.component').then(
        (c) => c.TaskFormComponent
      ),
  },

  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/edit/edit.component').then((c) => c.EditComponent),
  },
];
