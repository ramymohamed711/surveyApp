import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
// use FormsModule Only when using Template Driven Forms
// use ReactiveFormsModule Only when using Template Driven Forms
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';


import {AppComponent} from './app.component';

import {CreatSurveyComponent} from "./survey-forms/data-driven.component";
import {LoginComponent} from "./login/login.component"
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MyHttpInterceptor} from './my-http-interceptor';
import {HomeComponent} from './home/home.component';
import {AddsurveyComponent} from './addsurvey/addsurvey.component';
import {ShowsurveysComponent} from './showsurveys/showsurveys.component';
import {AuthGuard} from './auth.guard'
import {RedirectGuard} from './redirect.guard'
import {AuthserviceService} from './authservice.service';
import {ClientSurveyComponent} from "./client-survey/client-survey.component";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {KeysPipe} from './keys.pipe';
import {SuccessComponent} from './success/success.component';

const MY_ROUTS: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [RedirectGuard]},
  {path: 'addsurvey', component: AddsurveyComponent, canActivate: [AuthGuard]},
  {path: 'surveys', component: ShowsurveysComponent, canActivate: [AuthGuard]},
  {path: 'client/:id', component: ClientSurveyComponent},
  {path: 'success', component: SuccessComponent},
  {path: '**', redirectTo: 'home'}
]


@NgModule({
  declarations: [
    AppComponent,
    CreatSurveyComponent,
    LoginComponent,
    HomeComponent,
    AddsurveyComponent,
    ShowsurveysComponent,
    ClientSurveyComponent,
    KeysPipe,
    SuccessComponent
  ],
  // to use Forms we must have FormsModule OR ReactiveFormsModule Here
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(MY_ROUTS),
    BrowserAnimationsModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [AuthGuard,
    AuthserviceService,
    RedirectGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
