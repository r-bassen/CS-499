import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService]     // FIX ME: remove to avoid multiple instances
})
export class TripListingComponent implements OnInit{
  trips!: Trip[];
  message: string = '';
  constructor (
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService
    ) {
    console.log('trip-listing constructor');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();

  }

  public isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  public editTrip(trip: Trip) {
    console.log('Editing trip:', trip);
    console.log('Trip code:', trip.code);

    // Check if user is authenticated
    if (!this.isLoggedIn()) {
      alert('You must be logged in to edit trips!');
      this.router.navigate(['login']);
      return;
    }

    // Validate trip code exists
    if (!trip.code) {
      console.error('Trip code is undefined or null!');
      alert('Error: Cannot edit trip - missing trip code');
      return;
    }

    this.router.navigate(['edit-trip', trip.code]);
  }
  

  // deleteTrip method
  public deleteTrip(trip: Trip): void {
    console.log('Deleting trip:', trip);

    // Check if user is authenticated
    if (!this.isLoggedIn()) {
      alert('Error: You must be logged in!');
      this.router.navigate(['login']);
      return;
    }

    // Validate tripCode
    if (!trip.code) {
      console.error('Error: Missing trip code');
      alert('Error: Cannot delete - view console log');
      return;
    }


    if (confirm("Are you sure you want to delete this trip?")) {

      this.tripDataService.deleteTrip(trip.code)
        .subscribe({
          next: () => {
            //console.log('Trip deleted successfully');

            this.trips = this.trips.filter(t => t.code !== trip.code);
            this.message = `Trip "${trip.name}" deleted successfully.`;

            //console.log(this.message);
          },
          error: (err: any) => {
            //console.log('Error deleting trip: ', err);

            // More specific error handling
            if (err.status === 401) {
              alert('Authentication failed. Please log in again.');
              this.router.navigate(['login']);

            } else if (err.status === 404) {
              alert('Trip not found. It may have already been deleted.');

              // Refresh the trip list
            } else {
              alert('Error deleting trip. Please try again.');
            }
          }
        });
    }
  }

  // FIX ME: getStuff to loadtrips()
  private getStuff(): void {
    this.tripDataService.getTrips()

      .subscribe ({
        next: (value: any) => {   // FIX ME: TYPE ANY FOR Trip[]
          // FIX ME: Initialize trips array properly
          this.trips = value.map((trip: any) => ({
            ...trip,
            code: trip.code,
          }));

        if (value.length > 0) {
          this.message = 'There are ' + value.length + ' trips available.';
        }

        else {
          this.message = 'There were no trips retrieved from the database.';
        }
          console.log(this.message);
        },

      error: (err: any) => {
        console.log('Error: ', err);
      }
    })
  }


}
