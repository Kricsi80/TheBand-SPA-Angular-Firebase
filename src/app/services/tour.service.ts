import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Tour } from '../models/Tour';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  //helpers
  toursCollection: AngularFirestoreCollection<Tour>;
  tourDoc: AngularFirestoreDocument<Tour>;
  tours: Observable<Tour[]>;
  tour: Observable<Tour>;

  constructor(private afs: AngularFirestore) {
    this.toursCollection = this.afs.collection('tour_list', ref => ref.orderBy('tourDate', 'asc'));
  }

  getTours(): Observable<Tour[]> {
    //Get tours with ID
    this.tours = this.toursCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Tour;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
    return this.tours;
  }

  //get only one tour
  getTour(id: string): Observable<Tour> {
    this.tourDoc = this.afs.doc<Tour>(`tour_list/${id}`);
    this.tour = this.tourDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Tour;
          data.id = action.payload.id;
          return data;
        }
      }));
    return this.tour;
  }

  //add tour
  addTour(tour: Tour): void {
    this.toursCollection.add(tour);
  }

  //Edit tour
  updateTour(tour: Tour): void {
    this.tourDoc = this.afs.doc(`tour_list/${tour.id}`);
    tour.isUpdated = true;
    this.tourDoc.update(tour);
  }

  //Delete tour
  deleteTour(tour: Tour): void {
    this.tourDoc = this.afs.doc(`tour_list/${tour.id}`);
    this.tourDoc.delete();
  }

}
