import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserDataService } from '../services/user-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  usersError: string = '';
  showAddForm: boolean = false;
  newUser: User = {};
  formError: string = '';

  constructor(
    private userDataService: UserDataService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userDataService.getUsers()
      .subscribe({
        next: (users: User[]) => {
          this.users = users;
        },
        error: (err: any) => {
          console.error('Error loading users:', err);
          this.usersError = 'Failed to load users';
        }
      });
  }

  public createUser(): void {
    this.formError = '';


    this.userDataService.createUser(this.newUser)
      .subscribe({
        next: (users: User) => {

          this.newUser = {
            name: '',
            email: ''
          };

          this.showAddForm = false;
          this.loadUsers();
        },
        error: (err: any) => {
          console.error('Error deleting user:', err);
          alert('Failed to delete user');
        }
      });
  }

  public deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userDataService.deleteUser(userId)
        .subscribe({
          next: () => {
            this.loadUsers();
          },
          error: (err: any) => {
            console.error('Error deleting user:', err);
            alert('Failed to delete user');
          }
        });
    }
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/reservation'])
  }
}
