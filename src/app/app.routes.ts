import { Routes } from '@angular/router';
import {UsersComponent} from "./pages/users/users.component";
import {NotFoundComponent} from "./pages/fallback-pages/not-found/not-found.component";
import {UserViewComponent} from "./pages/user-view/user-view.component";
import {ForbiddenComponent} from "./pages/fallback-pages/forbidden/forbidden.component";

export const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'users/:id',
    children: [
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full'
      },
      {
        path: 'view',
        component: UserViewComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
