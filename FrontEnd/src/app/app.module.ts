import { BrowserModule } from '@angular/platform-browser';
import { NgModule , EventEmitter } from '@angular/core';
// use FormsModule Only when using Template Driven Forms
// use ReactiveFormsModule Only when using Template Driven Forms
import { ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { NgxQRCodeModule} from '@techiediaries/ngx-qrcode';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';


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

 import {KeysPipe} from './keys.pipe';
 import {ClientSurveyComponent} from "./client-survey/client-survey.component";
 import {SuccessComponent} from './success/success.component';

import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';


import { AuthserviceService } from './authservice.service';
import {CrossserviceService} from './crossservice.service';

import {MatButtonModule,
   MatInputModule ,
   MatCheckboxModule,
   MatNativeDateModule, 
   MatDatepickerModule,
   MatTabsModule,
   MatIconModule,
   MatToolbarModule,
   MatCardModule,
   MatTableModule,
  } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GetsurveysService} from './getsurveys.service';

const MY_ROUTS = [
  {path:'' , redirectTo:'home', pathMatch:'full' } , 
  {path:'home' , component: HomeComponent,canActivate:[AuthGuard] }, 
  {path:'login' , component: LoginComponent,canActivate:[RedirectGuard] }, 
  {path:'addsurvey', component: AddsurveyComponent,canActivate:[AuthGuard] },
  {path:'surveys', component: ShowsurveysComponent,canActivate:[AuthGuard] },
  {path: 'client/:id', component: ClientSurveyComponent},
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
    MatButtonModule,
     MatCheckboxModule,
     MatInputModule,
     MatNativeDateModule,
     BrowserAnimationsModule,
     MatDatepickerModule,
     MatTabsModule,
     MatIconModule,
     MatToolbarModule,
     MatCardModule,
     MatTableModule,
     NgxQRCodeModule,
    RouterModule.forRoot(MY_ROUTS),
    BrowserAnimationsModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [AuthGuard,
    AuthserviceService,
    GetsurveysService,
    RedirectGuard,
    CrossserviceService,
    {provide: HTTP_INTERCEPTORS, 
    useClass: MyHttpInterceptor, 
    multi: true 
} ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
