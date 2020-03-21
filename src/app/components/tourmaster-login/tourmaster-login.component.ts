import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'




@Component({
  selector: 'app-tourmaster-login',
  templateUrl: './tourmaster-login.component.html',
  styleUrls: ['./tourmaster-login.component.css']
})
export class TourmasterLoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    //check if already logged in
    this.auth.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/tourmaster/main']);
      }
    });
  }

  //Function for login
  onSubmit() {
    this.auth.login(this.email, this.password)
      .then(response => {
        //Success message
        Swal.fire({
          type: 'success',
          title: 'You are Logged in',
          showConfirmButton: false,
          timer: 1500
        })
        //Navigate to Main
        this.router.navigate(['/tourmaster/main']);
      })
      .catch(err => {
        //Error message
        Swal.fire({
          type: 'warning',
          title: `${err}`,
          showConfirmButton: true,
          confirmButtonColor: '#212121',
        });
      });
  }
}
