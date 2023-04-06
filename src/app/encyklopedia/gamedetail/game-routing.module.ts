import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamedetailComponent } from './gamedetail.component';
import { GameResolver } from './game-resolve.service';

const routes: Routes = [
  {
    path: ':slug',
    component: GamedetailComponent,
    resolve: {
      game: GameResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule {}
