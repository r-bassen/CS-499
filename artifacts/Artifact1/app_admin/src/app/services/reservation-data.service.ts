import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationDataService {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  // FIX ME: base URL not used. change reserveUrl to use baseUrl.
  baseUrl = 'http://localhost:3000/api';
  reserveUrl = 'http://localhost:3000/api/reservations';

  private getAuthHeaders(): HttpHeaders {
    // FIX ME: redundant variable declaration. insert localStorage directly in template literal (token).
    const token = localStorage.getItem('auth-token');

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // FIX ME: error handling for arrays
  // Get all reservations
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(
      this.reserveUrl, {
      headers: this.getAuthHeaders()
    });
  }

  // FIX ME: add auth headers
  // Create a new reservation
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(
      this.reserveUrl,
      reservation
    );
  }

  // FIX ME: add auth headers
  // Delete a reservation
  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.reserveUrl}/${id}`
    );
  }
}



