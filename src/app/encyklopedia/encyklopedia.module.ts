import { EncyklopediaRoutingModule } from './encyklopedia-routing.module';
import { EncyklopediaComponent } from './encyklopedia.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    EncyklopediaComponent
  ],
  imports: [
    EncyklopediaRoutingModule,
    SharedModule
  ],
  providers: []
})
export class EncyklopediaModule { }
