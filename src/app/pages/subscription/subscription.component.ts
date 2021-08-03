import { Component, OnInit,TemplateRef,ViewChild,HostBinding } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NbDialogService,NbComponentStatus,NbToastrService } from '@nebular/theme';
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
    private spinnerService: NgxSpinnerService,
    private toastrService: NbToastrService) { 
    
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

  showToast(duration: any,status: NbComponentStatus) {
    this.toastrService.show(
      `Te has suscrito exitosamente`,
      'Felicidades',
      { duration, status });
  }

}
