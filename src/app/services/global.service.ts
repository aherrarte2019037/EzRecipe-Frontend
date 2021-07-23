import { Injectable } from '@angular/core';
import {  FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private apiUrl: string = 'http://localhost:3000/api';

  constructor() { }

  getApiUrl(): string {
    return this.apiUrl;
  }

  static getSocialAuthConfig(): SocialAuthServiceConfig {
    return {
      providers: [
        { id: GoogleLoginProvider.PROVIDER_ID, provider: new GoogleLoginProvider('613809797182-bog6agtrck7ujc8n7mdbcf79r0087lv5.apps.googleusercontent.com') },
        { id: FacebookLoginProvider.PROVIDER_ID, provider: new FacebookLoginProvider('1443754062660797') }
      ]
    } as SocialAuthServiceConfig
  }

  static getCloudinaryUrl(): string {
    return 'https://api.cloudinary.com/v1_1/dykas17bj/upload';
  }

}
