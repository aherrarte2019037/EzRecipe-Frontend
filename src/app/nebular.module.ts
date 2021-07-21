import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbLayoutModule, NbSidebarModule, NbButtonModule, NbDatepickerModule, NbCardModule, NbInputModule, NbIconModule, NbActionsModule, NbUserModule, NbBadgeModule, NbContextMenuModule, NbMenuModule } from '@nebular/theme';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbMenuModule.forRoot()
  ],
  exports: [
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbDatepickerModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbActionsModule,
    NbUserModule,
    NbBadgeModule,
    NbContextMenuModule,
    NbMenuModule
  ]
})
export class NebularModule { }
