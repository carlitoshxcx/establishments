import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstablishmentsComponent } from '@establishments/establishments.component';

const routes: Routes = [
  { path: '', component: EstablishmentsComponent },
  { path: ':id', loadChildren: '@establishments/details/details.module#DetailsModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstablishimentsRouterModule { }
