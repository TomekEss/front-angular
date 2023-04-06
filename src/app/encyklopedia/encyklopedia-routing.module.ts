import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncyklopediaComponent } from './encyklopedia.component';

const routes: Routes = [
  {
    path:'',
    component: EncyklopediaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncyklopediaRoutingModule { }
