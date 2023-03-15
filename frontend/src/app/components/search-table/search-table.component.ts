import { Component, OnInit } from '@angular/core';
import { BusinessDataService } from 'src/app/services/business-data.service';
import { DisplayService } from 'src/app/services/display.service';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.css']
})
export class SearchTableComponent implements OnInit{

  businessData:any[] = [];

  constructor(private businessDataService:BusinessDataService,
    private displayService:DisplayService) { }

  ngOnInit(): void {
    this.businessData = this.businessDataService.getBusinessData();
    this.businessDataService.businessDataUpdated.subscribe(()=>{
      this.businessData = this.businessDataService.getBusinessData();
    });
  }

  async getDetailsAndReviews(id:string){
    await this.businessDataService.searchDetailData(id);
    await this.businessDataService.searchReviewData(id);
    this.displayService.setDisplay(2);
  }

  sort(e:MouseEvent){
    let direction = (e.target as Element).getAttribute("data-direction") as string;
    let sort = (e.target as Element).getAttribute("data-sort") as string;
    (e.target as Element).setAttribute("data-direction",direction === 'asc'? 'desc' :'asc');
    this.businessData.sort(this.orderBy(direction,sort));
  }

  private orderBy(direction:string,sort:string){
    return function compare(a:any,b:any):number{
      let comparison = 0;
      let value = (direction === 'desc' ? 1 : -1);
      switch(sort){
         case 'name':
            if(a.name > b.name){
               comparison = value;
            }
            else{
               comparison = value * -1;
            }
            break;
         case 'rating':
            if(a.rating > b.rating){
               comparison = value;
            }
            else{
               comparison = value * -1;
            }
            break;
         case 'distance':
            if(a.distance > b.distance){
               comparison = value;
            }
            else{
               comparison = value * -1;
            }
            break;
      }
      return comparison;
    }
  }



}
