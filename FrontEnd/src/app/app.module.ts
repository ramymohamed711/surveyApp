import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// use FormsModule Only when using Template Driven Forms
import { FormsModule } from '@angular/forms';
// use ReactiveFormsModule Only when using Template Driven Forms
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';

import { CreatSurveyComponent } from "./survey-forms/data-driven.component";
import {LoginComponent} from "./login/login.component"
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from './my-http-interceptor';
import { HomeComponent } from './home/home.component';
import { AddsurveyComponent } from './addsurvey/addsurvey.component';
import { ShowsurveysComponent } from './showsurveys/showsurveys.component';
import { SurveyComponent } from './survey/survey.component'
import {AuthGuard} from './auth.guard'
import {RedirectGuard} from './redirect.guard'
import { AuthserviceService } from './authservice.service';
const MY_ROUTS = [
  {path:'' , redirectTo:'home', pathMatch:'full' } , 
  {path:'home' , component: HomeComponent,canActivate:[AuthGuard] }, 
  {path:'login' , component: LoginComponent,canActivate:[RedirectGuard] }, 
  {path:'addsurvey', component: AddsurveyComponent,canActivate:[AuthGuard] },
  {path:'surveys', component: ShowsurveysComponent,canActivate:[AuthGuard] },
  {path:'survey/:id', component: SurveyComponent , canActivate:[AuthGuard] },
  {path:'**' , redirectTo:'home' }
]

@NgModule({
  declarations: [
    AppComponent, 
    CreatSurveyComponent,
    LoginComponent,
    HomeComponent,
    AddsurveyComponent,
    ShowsurveysComponent,
    SurveyComponent
  ],
  // to use Forms we must have FormsModule OR ReactiveFormsModule Here
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(MY_ROUTS)
  ],
  providers: [AuthGuard,
    AuthserviceService,
    RedirectGuard,
    {provide: HTTP_INTERCEPTORS, 
    useClass: MyHttpInterceptor, 
    multi: true 
} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
