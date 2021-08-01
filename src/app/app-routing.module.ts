import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasedRecipesComponent } from './components/purchased-recipes/purchased-recipes.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SavedRecipesComponent } from './pages/saved-recipes/saved-recipes.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [NoAuthGuard] },
  { path: 'register', component: RegisterPageComponent, canActivate: [NoAuthGuard] },
  { path: 'subscription', component: SubscriptionComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard], children: [
    { path: 'recipes', component: RecipesPageComponent },
    { path: 'profile', component: ProfilePageComponent },
    { path: 'purchasedRecipes', component: PurchasedRecipesComponent },
    { path: 'savedRecipes', component: SavedRecipesComponent },
    { path: 'user-profile/:username', component: UserProfileComponent },
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
