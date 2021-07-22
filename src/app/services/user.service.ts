import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = this.globalService.getApiUrl();

  constructor(private globalService: GlobalService, private http: HttpClient) { }

  addThreeCoins(): Observable<any>{

    return this.http.get(`${this.apiUrl}/addThreeCoins`)

  }

}
