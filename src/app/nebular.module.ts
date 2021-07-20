import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbLayoutModule, NbSidebarModule, NbButtonModule, NbDatepickerModule, NbCardModule, NbInputModule, NbIconModule } from '@nebular/theme';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbDatepickerModule,
    NbCardModule,
    NbInputModule,
    NbIconModule
  ]
})
export class NebularModule { }
