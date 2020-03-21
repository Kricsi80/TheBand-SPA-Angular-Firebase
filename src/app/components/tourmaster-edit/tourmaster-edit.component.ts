import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/services/tour.service';
import { Tour } from 'src/app/models/Tour';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateDate } from 'src/app/validators/custom_val';
import Swal from 'sweetalert2'

//variable to use later
const editTour: Tour = {
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
  selector: 'app-tourmaster-edit',
  templateUrl: './tourmaster-edit.component.html',
  styleUrls: ['./tourmaster-edit.component.css']
})
export class TourmasterEditComponent implements OnInit {
  id: string;
  tour: Tour;
  editForm: FormGroup;
  isCancelled: boolean;
  isExpired: boolean;


  constructor(
    private tourService: TourService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    //init formGroup
    this.editForm = this.formBuilder.group({
      tourDate: ['', [Validators.required, ValidateDate]],
      tourTime: ['', [Validators.required]],
      tourCity: ['', [Validators.required, Validators.minLength(2)]],
      tourVenue: ['', [Validators.required, Validators.minLength(2)]],
      ticketLink: ['', [Validators.required, Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)]],
    })


    //Get Id from Url
    this.id = this.route.snapshot.params['id'];
    //Get tour
    this.tourService.getTour(this.id).subscribe(tour => {
      //Törlés utáni hiba kiküszöbölése
      if (tour) {
        this.tour = tour;
        this.isCancelled = tour.isCancelled;
        //Check if is expired
        if (Date.parse(new Date().toISOString()) > tour.tourDate) {
          this.isExpired = true;
        } else {
          this.isExpired = false;
        };
        //workaround timzones
        // let baseDate: Date = new Date();
        // let timeZoneOffset = baseDate.getTimezoneOffset() * 60000;
        //fill up form
        this.editForm.patchValue({
          tourDate: new Date(this.tour.tourDate).toISOString().slice(0, 10),
          tourTime: new Date(this.tour.tourDate).toISOString().slice(11, 16),
          tourCity: this.tour.tourCity,
          tourVenue: this.tour.tourVenue,
          ticketLink: this.tour.ticketLink,
        });
      }
    });

  }

  // function to get formcontrol in template form fields
  get f() { return this.editForm.controls; }

  // Edit tour function
  onSubmit(value: any): void {
    if (this.editForm.invalid) {
      //message if form is invalid
      Swal.fire({
        type: 'error',
        title: 'Not Correct',
        text: 'The form is not filled in correctly',
        confirmButtonColor: '#212121'
      });
    } else {
      //Add id to editTour
      editTour.id = this.id;
      //make date from date & time input
      let baseDate: Date = new Date(`${value.tourDate}T${value.tourTime}:00.000Z`);
      //set editTour
      editTour.tourDate = baseDate.getTime();
      editTour.tourCity = value.tourCity;
      editTour.tourVenue = value.tourVenue;
      editTour.ticketLink = value.ticketLink;
      editTour.isCancelled = this.isCancelled;
      editTour.isExpired = this.isExpired;
      //update to DB
      this.tourService.updateTour(editTour);
      //Success message
      Swal.fire({
        type: 'success',
        title: 'Tour Edited',
        showConfirmButton: false,
        timer: 1500
      });
      //navigate back to main
      this.router.navigate(['/tourmaster/main']);
    }
  }

  //Delete tour fuction
  deleteTour() {
    //Confirm message
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d50000',
      cancelButtonColor: '#212121',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        //Deleting from DB
        this.tourService.deleteTour(this.tour);
        //navigate back to main
        this.router.navigate(['/tourmaster/main']);
        //Success message
        Swal.fire({
          type: 'success',
          title: 'Tour Deleted',
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

}
