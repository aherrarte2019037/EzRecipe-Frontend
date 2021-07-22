import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [NoAuthGuard] },
  { path: 'register', component: RegisterPageComponent, canActivate: [NoAuthGuard] },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard], children: [
    { path: 'recipes', component: RecipesPageComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '', pathMatch: 'full', redirectTo: 'recipes' }
  ]},
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
