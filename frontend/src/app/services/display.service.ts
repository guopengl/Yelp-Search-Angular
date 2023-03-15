import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private display = 0;  //0:display nothing; 1:display table; 2:display card
  displayUpdated:EventEmitter<any> = new EventEmitter();

  constructor() { }

  setDisplay(value:number){
    this.display = value;
    this.displayUpdated.emit(this.display);
  }

  getDisplay(){
    return this.display;
  }
}
