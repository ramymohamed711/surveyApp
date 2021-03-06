import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  myForm: FormGroup;
  @Input('error') error;
  constructor(private formBuilder: FormBuilder, private http: HttpClient , private router:Router) {
    this.myForm = formBuilder.group({
      'userData': formBuilder.group({
          'email': ['', [
            Validators.required,
            Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
          ]],
          'password': ['', Validators.required]
        },
      )
    });

    this.myForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );
  }

  onSubmit() {
    this.http.post('http://localhost:8080/admin/login', this.myForm.value.userData)
      .subscribe(res =>{
        if(res.hasOwnProperty('token')){
          localStorage.setItem('token',res['token'])
          this.router.navigateByUrl("/home");
        }
      },
      err => this.error = err['error']['message'])
  }


}
