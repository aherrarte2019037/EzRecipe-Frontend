import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'detailVisibility'
})
export class DetailVisibilityPipe implements PipeTransform {

  transform( value: any[] ): boolean {
    const type = value[0];
    const user = value[1];
    if( type === 'premium' && user?.idSubscription?.description !=="ezChef" && user.rol === 'Client' ) return false;

    return true;
  }

}
