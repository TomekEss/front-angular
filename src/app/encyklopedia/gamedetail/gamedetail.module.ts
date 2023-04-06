import { MarkdownyPipe } from './markdowny.pipe';
import { GameRoutingModule } from './game-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamedetailComponent } from './gamedetail.component';
import { SharedModule } from '../../shared';
import { GameOpinieComponent } from './game-opinie.component';

@NgModule({
  declarations: [
      GamedetailComponent,
      GameOpinieComponent,
      MarkdownyPipe
   ],
  imports: [
    SharedModule,
    GameRoutingModule
  ],

  providers: [
  ]
})
export class GamedetailModule { }
