import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  // FIX ME: base URL not used. change usersUrl to use baseUrl.
  baseUrl = 'http://localhost:3000/api';
  usersUrl = 'http://localhost:3000/api/users';

  private getAuthHeaders(): HttpHeaders {
    // FIX ME: redundant variable declaration.
    const token = localStorage.getItem('auth-token');

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // FIX ME: error handling for arrays
  // Get a list of all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl, { headers: this.getAuthHeaders() });
  }

  // Get one user by ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>('${this.usersUrl}/${id}', {headers: this.getAuthHeaders()});
  }

  // Create a new user
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user,
      { headers: this.getAuthHeaders() }
    );
  }

  // Update an existing user
  updateUser(user: User): Observable<User> {
    return this.http.put<User>('${this.usersUrl}/email/${user.email}', user,
      { headers: this.getAuthHeaders() });
  }

  // Delete a user
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>('${this.usersUrl}/email/${id}',
      { headers: this.getAuthHeaders() });
  }
}

