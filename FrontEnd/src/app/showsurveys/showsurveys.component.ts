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
  questions = []
  loadSurvey = false
  public dataSource ;
  constructor(private http: HttpClient, private cross : CrossserviceService) { 
      
}
ngOnInit(){
  this.allsurveys();
  this.cross.pushedData.subscribe(data=>{this.allsurveys();})
}

  allsurveys() {
    if (localStorage.getItem('token')) {
      return this.http.get('http://localhost:8080/admin/surveys')
       .subscribe(res => {this.dataSource = res['data']; console.log(this.dataSource)},
        err =>  console.log(['message']))
    }
  }

  loadsurvey(id){
    if (localStorage.getItem('token')) {
      return this.http.get('http://localhost:8080/admin/survey/'+id)
       .subscribe(res => {this.questions=res['questions']; this.loadSurvey= true },
        err =>  console.log(['message']))
    }
  }
  
}
