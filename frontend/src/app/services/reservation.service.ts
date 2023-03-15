import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservationData: any[];

  constructor() {
    if(localStorage.getItem('reservationData') == null)
    {
      localStorage.setItem('reservationData', '[]');
    }
    this.reservationData = JSON.parse(localStorage.getItem('reservationData') as string);
   }

  getreservationData(){
    return this.reservationData;
  }

  makeReservation(reservation : any){  //object {id, name, date, hour, minute, email}
    this.reservationData.push(reservation);
    localStorage.setItem('reservationData', JSON.stringify(this.reservationData));
    alert('Reservation created!');
  }

  cancelReservation(id:string){
    this.reservationData = this.reservationData.filter((reservation)=>reservation.id != id);
    localStorage.setItem('reservationData', JSON.stringify(this.reservationData));
    alert('Reservation cancelled!');
  } 

  isReserved(id:string):boolean{
    for(let i = 0; i < this.reservationData.length; i++)
    {
      if(this.reservationData[i].id === id) return true;
    }
    return false;
  }
}
