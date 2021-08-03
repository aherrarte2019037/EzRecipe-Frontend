import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  
  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
 
    const token = localStorage.getItem( 'token' ) ?? sessionStorage.getItem( 'token' ) ?? null;
    if( token ) req = req.clone({ headers: req.headers.set( 'Authorization', token )});

    return next.handle( req )

  }

}