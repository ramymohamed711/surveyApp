import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthserviceService {
  private token;
  constructor(private http: HttpClient) { }
  Auth() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')
      return this.http.get('http://localhost:8080/admin/check/' + this.token)
        .subscribe(res => { return  res['message'] },
        err => { return err['message'] })
    }
  }

}
