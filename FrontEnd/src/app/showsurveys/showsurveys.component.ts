import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import {CrossserviceService} from '../crossservice.service'

@Component({
  selector: 'app-showsurveys',
  templateUrl: './showsurveys.component.html',
  styleUrls: ['./showsurveys.component.css']
})
export class ShowsurveysComponent  {
  elementType = 'url';
  value = 'Techiediaries';
  public dataSource ;
  constructor(private http: HttpClient, private cross : CrossserviceService) { 
      
}
ngOnInit(){
  this.allsurveys();
  this.cross.pushedData.subscribe(data=>{this.allsurveys();})
}

  allsurveys() {
    if (localStorage.getItem('token')) {
     setTimeout(()=>{},1000);
      return this.http.get('http://localhost:8080/admin/surveys')
       .subscribe(res => {this.dataSource = res['data']; console.log(this.dataSource)},
        err =>  console.log(['message']))
    }
  
  }
  
}
