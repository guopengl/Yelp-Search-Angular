import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessDataService } from 'src/app/services/business-data.service';
import { DisplayService } from 'src/app/services/display.service';
import { ReservationService } from 'src/app/services/reservation.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnInit {
  //for the first tab
  detailData: any = {};  //array of detail of a business
  id: any;
  name: any;
  categories: any;
  address: any;
  phoneNumber: any;
  price: any;
  url: any;
  photos: any[] = [];
  isOpenNow: any;
  latitude: any;
  longitude: any;

  // google map tab
  mapOptions: any = { zoom: 14 };
  markerPosition: any = {};

  //reviews tab
  reviewData: any[] = [];

  //get today's date
  today = new Date();
  dd = this.today.getDate() < 10 ? '0'+ this.today.getDate() : this.today.getDate();
  mm = this.today.getMonth() + 1 < 10 ? '0'+this.today.getMonth() + 1: this.today.getMonth() + 1; //January is 0
  yyyy = this.today.getFullYear();
  todayString = `${this.yyyy}-${this.mm}-${this.dd}`;

  //modal reservation form
  isReserved = false;
  form !: FormGroup;
  submitted = false;

  constructor(private businessDataService:BusinessDataService,
    private displayService:DisplayService,
    private reservationService:ReservationService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.detailData = this.businessDataService.getDetailData();
    this.reviewData = this.businessDataService.getReviewData();

    //first tab
    this.name = this.detailData.name;
    this.id = this.detailData.id;
    this.categories = this.detailData.categories.map((category:any) => {
      return category.title;
    }).join(' | ');
    this.address = this.detailData.location.display_address.join(', ');
    this.phoneNumber = this.detailData.display_phone;
    this.price = this.detailData.price;
    this.url = this.detailData.url;
    this.photos = this.detailData.photos;
    this.latitude = this.detailData.coordinates.latitude;
    this.longitude = this.detailData.coordinates.longitude;
    if(this.detailData.hasOwnProperty("hours"))
    {
      this.isOpenNow = this.detailData.hours[0].is_open_now;
    }

    //google map
    this.mapOptions.center = { lat:this.latitude, lng: this.longitude};
    this.markerPosition = { lat:this.latitude, lng: this.longitude};

    //reservation button
    this.isReserved = this.reservationService.isReserved(this.id);

    //modal reservation form
    this.form = this.formBuilder.group(
      {
        email: ['',[Validators.required, Validators.email]],
        date: ['', Validators.required],
        hour: ['', Validators.required],
        minute: ['', Validators.required]
      }
    );

  }

  makeReservation(){
    this.submitted = true;

    if (this.form.invalid) return;

    let reservation ={
      id: this.id,
      name: this.name,
      date: this.form.value.date,
      time: `${this.form.value.hour}:${this.form.value.minute}`,
      email: this.form.value.email
    }; 
    this.reservationService.makeReservation(reservation);
    this.isReserved = true;
    document.getElementById('closeButton')?.click(); 
  }

  cancelReservation(){
    this.submitted = false;

    this.reservationService.cancelReservation(this.id);
    this.isReserved = false;
  }

  goBackToTable(){
    this.displayService.setDisplay(1);  //display table
  }

  exitAndReset(){
    this.submitted = false;
    this.form.reset();
  }
}
