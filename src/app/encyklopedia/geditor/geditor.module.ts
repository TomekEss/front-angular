import { GeditorRoutingModule } from './geditor-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

import { GeditorComponent } from './geditor.component'




@NgModule({
  declarations: [GeditorComponent],
  imports: [
    SharedModule,
    GeditorRoutingModule
  ]
})
export class GeditorModule { }
