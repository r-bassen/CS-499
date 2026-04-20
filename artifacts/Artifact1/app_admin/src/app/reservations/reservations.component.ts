import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationDataService } from '../services/reservation-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  reservationsError: string = '';
  showAddForm: boolean = false;
  newReservation: Reservation = {};
  formError: string = '';

  constructor(
    private reservationDataService: ReservationDataService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadReservations();
  }

  private loadReservations(): void {
    this.reservationDataService.getReservations()
      .subscribe({
        next: (reservations: Reservation[]) => {
          this.reservations = reservations;
        },
        error: (err: any) => {
          console.error('Error loading reservations:', err);
          this.reservationsError = 'Failed to load reservations';
        }
      });
  }

  public addReservation(): void {
    this.formError = '';
   
    this.reservationDataService.createReservation(this.newReservation)
      .subscribe({
        next: (reservation: Reservation) => {

          console.log('Reservation added: ', reservation);
          this.newReservation = {
            code: '',
            userName: '',
            userEmail: '',
            name: '',
            length: '',
            resort: '', 
            start: new Date(),
            numGuests: 1,
            totalCost: ''

          };

          this.showAddForm = false;
          this.loadReservations();
        },
        error: (err: any) => {
          console.error('Error adding reservation:', err);
          alert('Failed to add reservation');
        }
      });
  }

  public deleteReservation(reservationId: string): void {
      this.reservationDataService.deleteReservation(reservationId)
        .subscribe({
          next: () => {
            this.loadReservations();
          },
          error: (err: any) => {
            console.error('Error deleting reservation:', err);
            alert('Failed to delete reservation');
          }
        });
    }
  
  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
