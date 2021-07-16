import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = this.globalService.getApiUrl();

  constructor( private globalService: GlobalService, private http: HttpClient ) { }

  login( email: string, password: string, remember: boolean ) {
    return this.http.post<any>( `${this.apiUrl}/auth/login`, { email, password } ).pipe(
      tap( data => this.setToken( data?.token, remember ) )
    )
  }

  setToken( token: string, remember: boolean ) {
    if( remember && token ) localStorage.setItem( 'token', token )
    else if( !remember && token ) sessionStorage.setItem( 'token', token )
  }

  logOut() {
    localStorage.removeItem( 'token' )
    sessionStorage.removeItem( 'token' )
  }

}