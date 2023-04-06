import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core';
import { GeditorComponent } from './geditor.component';
import { EditableGameResolver } from './editable-game-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: GeditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':slug',
    component: GeditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      game: EditableGameResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeditorRoutingModule { }
