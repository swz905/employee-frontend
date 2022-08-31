import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {ErrorComponent} from './error/error.component';
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SignupComponent} from './signup/signup.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {Ng2TelInputModule} from "ng2-tel-input";
import {QuizComponent} from './quiz/quiz.component';
import {AdminComponent} from './admin/admin.component';
import {HttpClientModule} from "@angular/common/http";
import {EmployeeListComponent} from './manager/employee-list/employee-list.component';
import {StartTestComponent} from './start-test/start-test.component';
import {MinuteSecondsPipe} from './minute-seconds.pipe';
import {LogoutComponent} from './logout/logout.component';
import {ManagerComponent} from './manager/manager.component';
import {AllusersComponent} from './admin/allusers/allusers.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {AddQuestionComponent} from './admin/add-question/add-question.component';
import { ViewTestResultComponent } from './view-test-result/view-test-result.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    ErrorComponent,
    SignupComponent,
    WelcomeComponent,
    QuizComponent,
    AdminComponent,
    EmployeeListComponent,
    StartTestComponent,
    MinuteSecondsPipe,
    LogoutComponent,
    ManagerComponent,
    AllusersComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AddQuestionComponent,
    ViewTestResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatCheckboxModule,
    FlexLayoutModule,
    Ng2TelInputModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
