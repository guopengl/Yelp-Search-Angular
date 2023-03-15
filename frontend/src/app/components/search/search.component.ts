import { Component, OnInit } from '@angular/core';
import { DisplayService } from 'src/app/services/display.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  display = 0;
  constructor(private displayService:DisplayService) { }

  ngOnInit(): void {
    this.displayService.displayUpdated.subscribe(()=>{
      this.display = this.displayService.getDisplay();
    });
  }

}
