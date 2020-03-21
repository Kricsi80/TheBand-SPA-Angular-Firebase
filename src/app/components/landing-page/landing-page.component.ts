import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TourService } from 'src/app/services/tour.service';
import { Tour } from 'src/app/models/Tour';
import { timer } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  //helpers for countdown
  futureTours: Tour[];
  notCancelledFututeTours: Tour[];
  nextTour: Tour;
  now: number;
  timeDifference: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  ticketLink: string;
  location: string;

  constructor(
    private tourService: TourService,
    private router: Router
  ) { }

  ngOnInit() {
    // Get tours
    this.tourService.getTours().subscribe(tours => {
      // Get not cancelled future tours
      this.getNCTours(tours);
      // start countdown
      this.countDown();
    });

  }

  getNCTours(tours: Tour[]): void {
    //work around timezone
    let baseDate: Date = new Date();
    let timeZoneOffset = baseDate.getTimezoneOffset();
    let ISODateBase = baseDate.getTime() - (timeZoneOffset * 60000);
    this.now = ISODateBase;
    //Get not cancelled future tours
    this.futureTours = tours.filter(tour => tour.tourDate > this.now);
    this.notCancelledFututeTours = this.futureTours.filter(tour => tour.isCancelled === false);
  };

  countDown(): void {
    this.nextTour = this.notCancelledFututeTours[0];
    this.location = `${this.nextTour.tourVenue},  ${this.nextTour.tourCity}`;
    this.ticketLink = this.nextTour.ticketLink;
    //work around timezone
    let baseDate: Date = new Date();
    let timeZoneOffset: number = baseDate.getTimezoneOffset();
    let ISODateBase: number = baseDate.getTime() - (timeZoneOffset * 60000);
    let difference: number = this.nextTour.tourDate - ISODateBase;
    let diffSeconds: number = Math.floor(difference / 1000);
    //init timer
    timer(1000, 1000) //Initial delay 1 seconds and interval countdown also 1 second
      .pipe(
        takeWhile(() => diffSeconds > 0),
        tap(() => diffSeconds--)
      )
      .subscribe(() => {
        this.days = Math.floor(diffSeconds / (3600 * 24));
        this.hours = Math.floor((diffSeconds - (this.days * 3600 * 24)) / 3600);
        this.minutes = Math.floor((diffSeconds - ((this.days * 3600 * 24) + (this.hours * 3600))) / 60);
        this.seconds = Math.floor((diffSeconds - ((this.days * 3600 * 24) + (this.hours * 3600) + (this.minutes * 60))));
      });

  }

  //function for buy ticket button
  buyTicket(): void {
    window.open(this.ticketLink, '_blank');
    this.router.navigate(['/about']);
  }

}
