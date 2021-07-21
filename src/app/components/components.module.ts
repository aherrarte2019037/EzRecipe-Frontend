import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NebularModule } from '../nebular.module';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    NebularModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class ComponentsModule { }
