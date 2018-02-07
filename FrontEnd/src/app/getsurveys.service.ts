import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class GetsurveysService {
  private surveys :{} ; 
  constructor(private http: HttpClient) { }
  allsurveys() {
    if (localStorage.getItem('token')) {
     return this.http.get('http://localhost:8080/admin/surveys')
        .subscribe(res => {this.surveys=res; return this.surveys},
        err => { this.surveys = err['message'] })
    }
    
  }
}