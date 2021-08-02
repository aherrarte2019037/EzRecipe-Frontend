import { CUSTOM_ELEMENTS_SCHEMA, Injectable, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/main/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbDialogModule, NbMenuModule, NbSpinnerModule, NbThemeModule, NbToastrModule, NbWindowModule } from '@nebular/theme';
import { NebularModule } from './nebular.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule } from 'angularx-social-login';
import { GlobalService } from './services/global.service';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ComponentsModule } from './components/components.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SafePipe } from './pipes/safe.pipe';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TimeagoModule } from 'ngx-timeago';
import { TimeagoIntl, TimeagoFormatter, TimeagoCustomFormatter } from 'ngx-timeago';
import { FileUploadModule } from 'ng2-file-upload';
import { SavedRecipesComponent } from './pages/saved-recipes/saved-recipes.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

@Injectable({
  providedIn: 'root'
})
export class MyIntl extends TimeagoIntl { }

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NotFoundPageComponent,
    HomePageComponent,
    RecipesPageComponent,
    ProfilePageComponent,
    SafePipe,
    SubscriptionComponent,
    SavedRecipesComponent,
    UserProfileComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    PerfectScrollbarModule,
    ComponentsModule,
    NgxSpinnerModule,
    NbEvaIconsModule,
    FileUploadModule,
    NbSpinnerModule,
    TimeagoModule.forRoot({
      intl: { provide: TimeagoIntl, useClass: MyIntl },
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    }),
    NbMenuModule.forRoot(),
    NbWindowModule.forRoot(),
    CloudinaryModule.forRoot( { Cloudinary: CloudinaryCore }, { cloud_name: 'dykas17bj' } ),
    NbThemeModule.forRoot({ name: 'default' }),
    NbDialogModule.forRoot({ autoFocus: false, closeOnBackdropClick: false }),
    NbToastrModule.forRoot(),
    NebularModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: 'SocialAuthServiceConfig', useValue: { autoLogin: false, providers: GlobalService.getSocialAuthConfig().providers } }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }