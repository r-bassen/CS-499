
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formError: string = '';
  submitted = false;

  credentials = {
    name: '',
    email: '',
    password: ''
  }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  // FIX ME: can remove ngOnInit if not used
  ngOnInit(): void {
  }

  public onLoginSubmit(): void {
    this.formError = '';

    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
      // FIX ME: invalid navigation. change to return 
      this.router.navigateByUrl('#'); // Return to login page

    } else {

      this.doLogin();
    }
  }

  private doLogin(): void {

    const newUser: User = {
      name: this.credentials.name,
      email: this.credentials.email
    };

    // console.log('LoginComponent::doLogin');
    // console.log(this.credentials); 
    this.authenticationService.login(newUser, this.credentials.password).subscribe({
      next: (res: any) => {
        if (res?.token) {
          this.authenticationService.saveToken(res.token);
          // FIX ME: invalid navigation. Remove path trip-listing.
          this.router.navigate(['/trip-listing']);  // Redirect to homepage
        } else {
          this.formError = 'Invalid login attempt';
        }
        },
        error: (err: any) => {
          console.log('Login error: ', err);
          this.formError = 'Invalid login attempt';
        }
      });
  }
}
