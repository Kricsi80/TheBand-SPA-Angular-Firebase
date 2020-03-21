import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private afAuth: AngularFireAuth) { }

  //login auth
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
          err => reject(err))
    });
  }
  //logout auth
  logout(): void {
    this.afAuth.auth.signOut();
  }

  //check auth
  getAuth() {
    return this.afAuth.authState.pipe(first())
  }
}
