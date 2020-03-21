import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-tourmaster-header',
  templateUrl: './tourmaster-header.component.html',
  styleUrls: ['./tourmaster-header.component.css']
})
export class TourmasterHeaderComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    // check authentication
    this.auth.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  // Function for logout
  onLogoutClick() {
    // Confirm message
    Swal.fire({
      title: 'Are you sure?',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d50000',
      cancelButtonColor: '#212121',
      confirmButtonText: 'Yes, Log out!'
    }).then((result) => {
      if (result.value) {
        // logout
        this.auth.logout();
        // navigate to ligin
        this.router.navigate(['/about']);
        // Success message
        Swal.fire({
          type: 'success',
          title: 'You are Logged out',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

}
