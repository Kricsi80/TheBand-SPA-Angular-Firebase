import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AboutComponent } from './components/about/about.component';
import { ToursComponent } from './components/tours/tours.component';
import { MediaComponent } from './components/media/media.component';
import { TourmasterLoginComponent } from './components/tourmaster-login/tourmaster-login.component';
import { TourmasterMainComponent } from './components/tourmaster-main/tourmaster-main.component';
import { TourmasterAddComponent } from './components/tourmaster-add/tourmaster-add.component';
import { TourmasterEditComponent } from './components/tourmaster-edit/tourmaster-edit.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { TourService } from './services/tour.service';
import { AuthenticationService } from './services/authentication.service';
import { FooterComponent } from './components/footer/footer.component';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TourmasterHeaderComponent } from './components/tourmaster-header/tourmaster-header.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AboutComponent,
    ToursComponent,
    MediaComponent,
    TourmasterLoginComponent,
    TourmasterMainComponent,
    TourmasterAddComponent,
    TourmasterEditComponent,
    NotFoundComponent,
    LandingPageComponent,
    FooterComponent,
    TourmasterHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'the-band-project'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    TourService,
    AuthenticationService,
    AngularFireAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
