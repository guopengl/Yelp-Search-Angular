import { Component, OnInit } from '@angular/core';
import { BusinessDataService } from 'src/app/services/business-data.service';
import { DisplayService } from 'src/app/services/display.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  inputKeyword = "";
  inputDistance = "";
  private defaultDistance = "10";
  inputCategory = "All";
  inputLocation = "";
  checkboxFlag = false;
  locationDisabled = false;
  keywords:string[]= [];
  isLoading = false;

  constructor(private businessData:BusinessDataService,
    private display:DisplayService) { }

  ngOnInit(): void {
  }

  async keywordAutocomplete(){
    this.keywords = [];
    this.isLoading = true;
    if(this.inputKeyword === "") 
    {
      this.isLoading = false;
      return;
    }

    const response = await fetch(`${environment.host}/autocomplete?text=${this.inputKeyword}`);
    const data = await response.json();
    this.isLoading = false;
    data.categories.map((category:any)=>{
      this.keywords.push(category.title);
    });
    data.terms.map((term:any)=>{
      this.keywords.push(term.text);
    });
    
  }

  async submit(){
    if(this.inputKeyword == "") return;
    if(!this.checkboxFlag && this.inputLocation == "") return;

    if(this.inputDistance == "")
    {
      await this.businessData.searchBusinessData(this.inputKeyword, this.defaultDistance, this.inputCategory, this.inputLocation, this.checkboxFlag);
    }
    else
    {
      await this.businessData.searchBusinessData(this.inputKeyword, this.inputDistance, this.inputCategory, this.inputLocation, this.checkboxFlag);
    }
    this.display.setDisplay(1);
  }

  clear(){
    this.inputKeyword = "";
    this.inputDistance = "";
    this.inputCategory = "All";
    this.inputLocation = "";
    this.checkboxFlag = false;
    this.locationDisabled = false;
    this.display.setDisplay(0);
    this.keywords = [];
  }

  checkboxClicked(){
    this.checkboxFlag = !this.checkboxFlag;
    this.locationDisabled = !this.locationDisabled;
    this.inputLocation = "";
  }
}
