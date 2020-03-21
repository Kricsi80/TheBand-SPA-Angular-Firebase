import { Component, OnInit } from '@angular/core';
import { Tour } from 'src/app/models/Tour';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TourService } from 'src/app/services/tour.service';
import { Router } from '@angular/router';
import { ValidateDate } from 'src/app/validators/custom_val';
import Swal from 'sweetalert2'

//variable to use later
const newTour: Tour = {
  id: '',
  tourDate: 0,
  tourCity: '',
  tourVenue: '',
  ticketLink: '',
  isExpired: false,
  isCancelled: false,
  isUpdated: false,
};

@Component({
  selector: 'app-tourmaster-add',
  templateUrl: './tourmaster-add.component.html',
  styleUrls: ['./tourmaster-add.component.css']
})
export class TourmasterAddComponent implements OnInit {

  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tourService: TourService,
    private router: Router,

  ) { }

  ngOnInit() {
    //init formgroup
    this.addForm = this.formBuilder.group({
      tourDate: ['', [Validators.required, ValidateDate]],
      tourTime: ['', [Validators.required]],
      tourCity: ['', [Validators.required, Validators.minLength(2)]],
      tourVenue: ['', [Validators.required, Validators.minLength(2)]],
      ticketLink: ['', [Validators.required, Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)]],
    });
  }

  // function to get formcontrol in template form fields
  get f() { return this.addForm.controls; }

  //Add tour function
  onSubmit(value: any): void {
    if (this.addForm.invalid) {
      //message if form is invalid
      Swal.fire({
        type: 'error',
        title: 'Not Correct',
        text: 'The form is not filled in correctly',
        confirmButtonColor: '#212121'
      });
    } else {
      //make date from date & time input
      let baseDate: Date = new Date(`${value.tourDate}T${value.tourTime}:00.000Z`);
      // set newTour
      newTour.tourDate = baseDate.getTime();
      newTour.tourCity = value.tourCity;
      newTour.tourVenue = value.tourVenue;
      newTour.ticketLink = value.ticketLink;
      //add to DB
      this.tourService.addTour(newTour);
      //Success message
      Swal.fire({
        type: 'success',
        title: 'Tour Added',
        showConfirmButton: false,
        timer: 1500
      });
      //navigate back to main
      this.router.navigate(['/tourmaster/main']);
    }

  }

}
