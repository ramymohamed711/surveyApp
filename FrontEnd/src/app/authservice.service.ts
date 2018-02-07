import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthserviceService {
  private token;
  private validate = false;

  constructor(private http: HttpClient) {
  }

  Auth() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      console.log(this.token);
      this.http.options('http://localhost:8080/admin/check/' + this.token)
        .subscribe(res => {
            console.log(res);
            this.validate = res['message'];
          },
          err => {
            console.log(err);
            this.validate = err['message'];
          })

      console.log(this.validate)
    }
    console.log(this.validate)
    return this.validate
  }

}
