import { Component, OnInit,TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  disableModal = true;

  constructor( private dialogService: NbDialogService) { }

  ngOnInit(): void {
  }

  open(dialog: TemplateRef<any>){
    this.disableModal = true;
    this.dialogService.open(dialog);
  }

}
