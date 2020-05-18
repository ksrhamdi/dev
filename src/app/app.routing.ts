
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './pages/layouts/default/default.component';
import { DashboardComponent } from './pages/modules/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AddpactionComponent } from './pages/modules/addpaction/addpaction.component';
import {EnrechirPlandComponent } from './pages/modules/enrechir-pland/enrechir-pland.component';
import {AddActionComponent } from './pages/modules/add-action/add-action.component';

import { AuthGuard } from './services/auth.guard';
import { EditActionComponent } from './pages/modules/edit-action/edit-action.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {path: 'login', component: LoginComponent},
  {
  path: 'dashboard', component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  },
  {
    path: 'enrechirpland/:id',
    component: EnrechirPlandComponent
  },
  {
    path: '\add',
    component: AddpactionComponent
  },
  {
    path: '\addAction/:idpland/:idtheme',
    component: AddActionComponent
  },
  {
    path: '\editAction/:id',
    component: EditActionComponent
  }
],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

