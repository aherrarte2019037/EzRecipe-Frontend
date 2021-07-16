import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private apiUrl: string = 'http://localhost:3000/api';

  constructor() { }

  getApiUrl(): string {
    return this.apiUrl;
  }

}
