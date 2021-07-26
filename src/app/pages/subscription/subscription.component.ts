import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NbDialogService } from '@nebular/theme';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
  providers: [SubscriptionService]
})
export class SubscriptionComponent implements OnInit {
  showContent: boolean = false;
  disableModal = true;
  @ViewChild('dialog1') dialog!: TemplateRef<any>;

  constructor( 
    private dialogService: NbDialogService, 
    private _subService: SubscriptionService,
    private spinnerService: NgxSpinnerService,) { 
    
  }

  ngOnInit(): void {
    this.spinnerBehavior();
  }

  spinnerBehavior () {
    this.spinnerService.show( 'main' );
    setTimeout( () => { this.showContent = true; this.spinnerService.hide( 'main' ) }, 2000 );
  }

  openCard(){
    this.dialogService.open(this.dialog);
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
