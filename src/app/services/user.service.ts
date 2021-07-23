import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = this.globalService.getApiUrl();
  userLogged: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private globalService: GlobalService, private http: HttpClient) {
    this.setUserLlogged();
  }

  addThreeCoins(): Observable<any>{

    return this.http.get(`${this.apiUrl}/addThreeCoins`)

  }

  setUserLlogged() {
    this.http.get<any>( `${this.apiUrl}/userLogged`).pipe(
      tap( data => this.userLogged.next( data?.userFound ) )
    ).subscribe();
  }

}