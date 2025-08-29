import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ProfileComponent } from './features/auth/profile/profile.component';
import { HallCatalogComponent } from './features/halls/catalog/hall-catalog.component';
import { HallListComponent } from './features/halls/list/hall-list.component';
import { HallFormComponent } from './features/halls/form/hall-form.component';
import { HallDetailsComponent } from './features/halls/details/hall-details.component';
import { HallAvailabilityComponent } from './features/halls/availability/hall-availability.component';
import { BookingListComponent } from './features/bookings/list/booking-list.component';
import { BookingFormComponent } from './features/bookings/form/booking-form.component';
import { BookingDetailsComponent } from './features/bookings/details/booking-details.component';
import { MyBookingsComponent } from './features/bookings/my-bookings/my-bookings.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UsersComponent } from './features/users/users.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { GuestGuard } from './core/guards/guest.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  // Halls
  { path: 'halls', component: HallCatalogComponent }, // public view
  { path: 'halls/admin', component: HallListComponent, canActivate: [AdminGuard] },
  { path: 'halls/add', component: HallFormComponent, canActivate: [AdminGuard] },
  { path: 'halls/:id/edit', component: HallFormComponent, canActivate: [AdminGuard] },
  { path: 'halls/:id', component: HallDetailsComponent },
  { path: 'availability', component: HallAvailabilityComponent },

  // Bookings
  { path: 'bookings', component: BookingListComponent, canActivate: [AdminGuard] },
  { path: 'bookings/my', component: MyBookingsComponent, canActivate: [AuthGuard] },
  { path: 'bookings/add', component: BookingFormComponent, canActivate: [AuthGuard] },
  { path: 'bookings/:id/edit', component: BookingFormComponent, canActivate: [AuthGuard] },
  { path: 'bookings/:id', component: BookingDetailsComponent, canActivate: [AuthGuard] },

  // Dashboard and users
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
