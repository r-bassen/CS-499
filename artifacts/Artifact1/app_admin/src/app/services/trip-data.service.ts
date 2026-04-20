import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor (
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  // FIX ME: base URL not used. change tripsUrl to use baseUrl.
  private baseUrl = 'http://localhost:3000/api'; 
  private tripsUrl = 'http://localhost:3000/api/trips';

  private getAuthHeaders(): HttpHeaders {
    // FIX ME: redundant variable declaration. insert localStorage directly in template literal (token).
    const token = localStorage.getItem('auth-token');

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // FIX ME: error handling for arrays
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl, {
      headers: this.getAuthHeaders()
    });
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.tripsUrl, formData,
      { headers: this.getAuthHeaders() });
  }

  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(this.tripsUrl + '/' + code,
      { headers: this.getAuthHeaders() });
  }

  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(this.tripsUrl + '/' + formData.code, formData,
      { headers: this.getAuthHeaders() });
  }


  // deleteTrip method
  deleteTrip(code: string): Observable<any> {
    return this.http.delete(this.tripsUrl + '/' + code,
      { headers: this.getAuthHeaders() });
  }

  // FIX ME: error handling for arrays
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/users',
      { headers: this.getAuthHeaders() });
  }

  // FIX ME: error handling for arrays
  getReservation(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/reservations',
      { headers: this.getAuthHeaders() });
  }

  // Call to our /login endpoint, returns JWT 
  login(user: User, passwd: string): Observable<AuthResponse> {
    // console.log('Inside TripDataService::login'); 
    return this.handleAuthAPICall('login', user, passwd);
  }

  // Call to our /register endpoint, creates user and returns JWT 
  register(user: User, passwd: string): Observable<AuthResponse> {
    // console.log('Inside TripDataService::register'); 
    return this.handleAuthAPICall('register', user, passwd);
  }


  // helper method to process both login and register methods 
  handleAuthAPICall(endpoint: string, user: User, passwd: string):
    Observable<AuthResponse> {
    // console.log('Inside TripDataService::handleAuthAPICall'); 
    let formData = {
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint, formData);
  }
}
