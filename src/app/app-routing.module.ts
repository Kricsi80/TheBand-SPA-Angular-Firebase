import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ToursComponent } from './components/tours/tours.component';
import { MediaComponent } from './components/media/media.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TourmasterAddComponent } from './components/tourmaster-add/tourmaster-add.component';
import { TourmasterEditComponent } from './components/tourmaster-edit/tourmaster-edit.component';
import { TourmasterLoginComponent } from './components/tourmaster-login/tourmaster-login.component';
import { TourmasterMainComponent } from './components/tourmaster-main/tourmaster-main.component';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'media', component: MediaComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'tours', component: ToursComponent },
  { path: 'login', component: TourmasterLoginComponent },
  { path: 'tourmaster/main', component: TourmasterMainComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'tourmaster/add', component: TourmasterAddComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'tourmaster/edit/:id', component: TourmasterEditComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: '', component: LandingPageComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
