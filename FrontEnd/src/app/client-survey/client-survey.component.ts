///<reference path="../model/Survey.ts"/>
///<reference path="../question.service.ts"/>
import {Component, OnInit} from '@angular/core';
import {Survey} from "../model/Survey";

import {SurveyService} from "./survey.service";
import {HttpErrorHandler} from "../http-error-handler.service";
import {MessageService} from "../message.service";
import {QuestionService} from "../question.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-client-survey',
  templateUrl: './client-survey.component.html',
  styleUrls: ['./client-survey.component.css'],
  providers: [SurveyService, HttpErrorHandler, MessageService, QuestionService],
})
export class ClientSurveyComponent implements OnInit {


  survey: Survey = <any>{};
  surveyEdit = {
    survey_id: 1,
    survey_title: "My Survey",
    questions: [ ],
    survey_statDate: new Date(),
    survey_endDate: new Date(),
    survey_status: true,
    survey_link: "link",
    qrCode: "qrLink"
  };
  id;


  constructor(private ss: SurveyService, private queService:QuestionService, private router:Router, private route: ActivatedRoute){
    route.params.subscribe( param => {this.id = param['id'];})
    // console.log(this.id);
  }

  ngOnInit(): void {
    this.getSurvey(this.id);
  }

  getSurvey(id): void {
    this.ss.getSurvey(id)
      .subscribe(data => {
        this.survey = data['data'];
        console.log(this.survey);
        let answers = {
          'answer1': {'answer': 'Excellent', 'counter': 0},
          'answer2': {'answer': 'Very good', 'counter': 0},
          'answer3': {'answer': 'good', 'counter': 0},
          'answer4': {'answer': 'not good', 'counter': 0}
        };
        this.surveyEdit.survey_id = this.survey.survey_id;
        this.surveyEdit.survey_title = this.survey.survey_title;
        for (let q of this.survey.questions) {
          this.surveyEdit.questions.push(this.queService.createQuestion(q, answers));
        }

        this.surveyEdit.survey_status = this.survey.survey_status;
        this.surveyEdit.survey_link = this.survey.survey_link;
        this.surveyEdit.survey_endDate = this.survey.survey_endDate;
        this.surveyEdit.survey_statDate = this.survey.survey_statDate;
        this.surveyEdit.qrCode = this.survey.qrCode;
        console.log(this.surveyEdit);
      });
  }

  onSubmit(form) {
    let v = {survey: null, questions: {}};
    v.survey = this.surveyEdit.survey_id;
    v.questions = form.value;
    console.log(v);
    this.ss.putSurvey(v)
      .subscribe(data => {
        console.log(this.router)
        this.router.navigateByUrl("/success");

        // console.log(data);
       // console.log('Modified successfully ...');
      })
  }
}
