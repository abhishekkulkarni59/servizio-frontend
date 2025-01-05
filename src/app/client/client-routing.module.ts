import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientDashboardComponent } from './pages/client-dashboard/client-dashboard.component';
import { AdDetailComponent } from './pages/ad-detail/ad-detail.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';

const routes: Routes = [{ path: '', component: ClientComponent },
{ path: 'dashboard', component: ClientDashboardComponent },
{ path: 'ad/:adId', component: AdDetailComponent },
{ path: 'review/:bookingId', component: AdDetailComponent },
{ path: 'bookings', component: MyBookingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
