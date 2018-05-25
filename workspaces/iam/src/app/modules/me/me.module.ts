import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeComponent } from './me/me.component';
import { MeRoutingModule } from './me-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MeRoutingModule
  ],
  declarations: [MeComponent]
})
export class MeModule { }
