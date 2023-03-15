import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingTableComponent } from './components/booking-table/booking-table.component';
import { SearchComponent } from './components/search/search.component';


const routes: Routes = [
  {path:'',redirectTo: '/search', pathMatch: 'full'},
  {path:'search',component:SearchComponent},
  {path:'bookings',component:BookingTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
