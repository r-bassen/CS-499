import { Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { LoginComponent } from './login/login.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { UsersComponent } from './users/users.component';
//import { SettingsComponent } from './reservations/reservations.component';  // make this component


export const routes: Routes = [
  { path: '', component: TripListingComponent, pathMatch: 'full' },
  { path: 'travel', component: TripListingComponent },
  { path: 'add-trip', component: AddTripComponent },
  { path: 'edit-trip/:tripCode', component: EditTripComponent },
  { path: 'delete-trip', component: TripListingComponent },   // EDIT: Added delete-trip route
  { path: 'reservations', component: ReservationsComponent },
  { path: 'users', component: UsersComponent },
 // { path: 'settings', component: SettingsComponent },
  { path: 'login', component: LoginComponent }

];

// FIX ME: Not used currently
export class AppRoutingModule { }
