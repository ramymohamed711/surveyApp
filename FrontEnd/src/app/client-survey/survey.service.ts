import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpErrorHandler} from "../http-error-handler.service";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class SurveyService {

  getSurveyApi = 'http://localhost:8080/client/';
  putSurveyApi = 'http://localhost:8080/client/submitSurvey';

  constructor(private _http: HttpClient, httpErrorHandler: HttpErrorHandler) {
  }

  getSurvey(id){
    return this._http.get(this.getSurveyApi + id);
  }

  putSurvey(form){
    return this._http.put(this.putSurveyApi, form);
  }
}
