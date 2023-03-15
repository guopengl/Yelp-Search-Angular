import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  classForSearch={
    'active' : true
  };

  classForBookings={
    'active' : false
  };

  href="";
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.href = this.router.url;
    if(this.href == "/search") {
      this.searchClicked();
    }
    else if(this.href == "/bookings"){
      this.bookingsClicked();
    }

    this.router.events.pipe(filter(e=>e instanceof NavigationEnd)).subscribe((e:any)=>{
      this.href = e.url;
      if(this.href == "/search") {
        this.searchClicked();
      }
      else if(this.href == "/bookings"){
        this.bookingsClicked();
      }
    });
  }

  searchClicked(){
    this.classForSearch.active = true;
    this.classForBookings.active = false;
  }
  bookingsClicked(){
    this.classForSearch.active = false;
    this.classForBookings.active = true;
  }
}
