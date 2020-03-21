import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/services/tour.service';
import { Tour } from 'src/app/models/Tour';


@Component({
  selector: 'app-tourmaster-main',
  templateUrl: './tourmaster-main.component.html',
  styleUrls: ['./tourmaster-main.component.css']
})
export class TourmasterMainComponent implements OnInit {
  tours: Tour[];
  dateString: string;


  constructor(private tourService: TourService) { }

  ngOnInit() {
    // get tours
    this.tourService.getTours().subscribe(tours => {
      this.tours = tours;
      // Checking and Setting if Tour is expired
      tours.forEach(tour => {
        if (Date.parse(new Date().toISOString()) > tour.tourDate) {
          tour.isExpired = true;
        } else {
          tour.isExpired = false;
        };
      });
    })
  }

  // Function to display Tour date & time
  getDateFromtourDate(tourDate: number): string {
    let year: string = new Date(tourDate).toISOString().slice(0, 4);
    let month: string = new Date(tourDate).toISOString().slice(5, 7);
    let day: string = new Date(tourDate).toISOString().slice(8, 10);
    let hour: string = new Date(tourDate).toISOString().slice(11, 13);
    let minute: string = new Date(tourDate).toISOString().slice(14, 16);
    this.dateString = `${year}/${month}/${day}, ${hour}:${minute}`;
    return this.dateString;
  }
}
