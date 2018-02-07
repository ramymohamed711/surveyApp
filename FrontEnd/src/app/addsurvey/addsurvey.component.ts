import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CrossserviceService} from '../crossservice.service'


import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'app-addsurvey',
  templateUrl: './addsurvey.component.html',
  styleUrls: ['./addsurvey.component.css']
})
export class AddsurveyComponent {
  myForm: FormGroup;
  success: boolean;
  url : "http://localhost:4200/client/";
  elementType :"url"
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private cross: CrossserviceService) {
    this.myForm = formBuilder.group({
      'surveyData': formBuilder.group({
        'surveytitle': ['', [Validators.required]],
        'surveyStartDate': ['', [Validators.required]],
        'surveyEndDate': ['', [Validators.required]],
      },

      ),
      'questions': formBuilder.array([
        ['', Validators.required]
      ])
    });

    this.myForm.statusChanges.subscribe(
      (data: any) => this.success = false
    );
  }

  onAddQuestion() {
    (<FormArray>this.myForm.controls['questions']).push(new FormControl('', Validators.required));
  }



  onremoveQuestion(i) {
    (<FormArray>this.myForm.controls['questions']).removeAt(i);
  }
  onSubmit() {
    this.http.post('http://localhost:8080/admin/survey/create', this.myForm.value)
      .subscribe(res =>res, err => console.log(err),
      ()=>{this.cross.pushData("ramy"); this.success = true;})
    console.log(localStorage.getItem('key'))
  }
}

