import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-booking-table',
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.css']
})
export class BookingTableComponent implements OnInit {
  reservationData: any[] = []; //every member {id, name, date, hour, minute, email}
  constructor(private reservationService:ReservationService) { }

  ngOnInit(): void {
    this.reservationData = this.reservationService.getreservationData();
  }

  cancelReservation(id:string){
    this.reservationService.cancelReservation(id);
    this.reservationData =this.reservationService.getreservationData();
  }

}
