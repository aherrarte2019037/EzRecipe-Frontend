import { Component, OnInit,TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
  providers: [SubscriptionService]
})
export class SubscriptionComponent implements OnInit {

  disableModal = true;

  constructor( private dialogService: NbDialogService, private _subService: SubscriptionService) { }

  ngOnInit(): void {
  }

  open(dialog: TemplateRef<any>){
    this.disableModal = true;
    this.dialogService.open(dialog);
  }

  addSubChef(){

    this._subService.addSubChef().subscribe(
      data=>{
        console.log(data);

      },
      error=>{
        console.log(<any>error);

      }
    )

  }

}
