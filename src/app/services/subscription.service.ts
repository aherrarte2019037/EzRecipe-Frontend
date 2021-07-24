import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private apiUrl = this.globalService.getApiUrl();

  constructor(private globalService: GlobalService, private http: HttpClient) { }

  addSubChef(): Observable<any>{

    return this.http.get(`${this.apiUrl}/assignSubChef`)

  }

}
