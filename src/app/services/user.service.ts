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
    this.http.get<any>( `${this.apiUrl}/getUserLogged`).pipe(
      tap( data => this.userLogged.next( data?.userFound ) )
    ).subscribe();
  }

  getChefRequests(): Observable<any>{

    return this.http.get(`${this.apiUrl}/getChefRequests`);

  }

  confirmChefRquest(id: String):Observable<any>{

    return this.http.get(`${this.apiUrl}/confirmChefRequest/${id}`);

  }

  cancelChefRequest(id: String):Observable<any>{

    return this.http.get(`${this.apiUrl}/cancelChefRequest/${id}`);

  }

  petitionChefRequest():Observable<any>{

    return this.http.get(`${this.apiUrl}/petitionChefRequest/`);

  }

  purchasedRecipes(id: string){

    return this.http.get<any>(`${this.apiUrl}/purchasedRecipes/${id}`);

  }

  showPurchasedRecipes(){

    return this.http.get<any>(`${this.apiUrl}/showPurchasedRecipes`);

  }

  editUser( userUpdate: any, userId: string ):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/editUser/${userId}`, userUpdate);
  }

  getUserStats() {
    return this.http.get<any>(`${this.apiUrl}/userStats`);
  }

  getSavedRecipes(){
    return this.http.get<any>(`${this.apiUrl}/savedRecipes`);
  }

}
