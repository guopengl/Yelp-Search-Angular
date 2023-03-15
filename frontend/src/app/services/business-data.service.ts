import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessDataService {
  
  private businessData:any[] = [];  //data of 10 businesses, an array
  businessDataUpdated:EventEmitter<any> = new EventEmitter(); //every time businessData is changed, use this to emit it

  private detailData: any = {};  //detail data of a specific business,an object
  private reviewData: any = []; //reviews of several people, an array

  constructor() {  }

  getBusinessData(){
    return this.businessData;
  }

  getDetailData(){
    return this.detailData;
  }

  getReviewData(){
    return this.reviewData;
  }

  async searchBusinessData(keyword:string, distance:string, category:string, location:string, checkboxFlag:boolean){
    if(isNaN(parseFloat(distance)))
    {
      this.businessData = [];
      this.businessData.push('Entered distance is not a number');
      this.businessDataUpdated.emit(this.businessData);
      return;
    }
    let radius = parseFloat(distance) * 1609.344;
    radius = Math.round(radius);

    let latitude = 0;
    let longitude = 0;
    if(checkboxFlag === true)
    {
      let loc = await this.getLocFromIp();
      latitude = loc[0];
      longitude = loc[1];
    }
    else
    {
      let loc = encodeURI(location);
      let data = await this.getLocFromInput(loc);
      if(data == undefined) 
      {
        this.businessData = [];
        this.businessData.push('Entered location does not exists');
        this.businessDataUpdated.emit(this.businessData);
        return;
      }
      latitude = data.lat;
      longitude = data.lng;
    }

    const response = await fetch(`${environment.host}/searchyelp?term=${keyword}&latitude=${latitude}&longitude=${longitude}&categories=${category}&radius=${radius}`);
    const data = await response.json(); 
    this.businessData = data.businesses; //array of businesses info
    this.businessDataUpdated.emit(this.businessData);
  }

  private async getLocFromIp(){
    const response = await fetch("https://ipinfo.io/?token=");
    const data = await response.json();
    let loc = data.loc;
    loc = loc.split(",");
    return loc;
  }

  private async getLocFromInput(loc:string){
    const response = await fetch(`${environment.host}/geocoding?address=${loc}`);
    const data = await response.json();
    if(data.results.length != 0)
    {
      let location = data.results[0].geometry.location;
      return location; 
    }
  }

  async searchDetailData(id:string){
    const response = await fetch(`${environment.host}/detail?id=${id}`);
    const data = await response.json();
    this.detailData = data;   //an object of a business
  }

  async searchReviewData(id:string){
    const response = await fetch(`${environment.host}/reviews?id=${id}`);
    const data = await response.json();
    this.reviewData = data.reviews;  //array of several reviews
  }
}

