import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Shared components
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

// Feature components
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
import { HomeComponent } from './features/home/home.component';
import { UsersComponent } from './features/users/users.component';

import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HallCatalogComponent,
    HallListComponent,
    HallFormComponent,
    HallDetailsComponent,
    HallAvailabilityComponent,
    BookingListComponent,
    BookingFormComponent,
    BookingDetailsComponent,
    MyBookingsComponent,
    DashboardComponent,
    HomeComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
