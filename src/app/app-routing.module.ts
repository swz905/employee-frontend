import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ErrorComponent} from "./error/error.component";
import {SignupComponent} from "./signup/signup.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {AdminComponent} from "./admin/admin.component";
import {StartTestComponent} from "./start-test/start-test.component";
import {RouteGuardService} from "./services/route-guard.service";
import {LogoutComponent} from "./logout/logout.component";
import {ManagerComponent} from "./manager/manager.component";
import {AdminGuard, ManagerGuard, UserGuard} from "./services/role.guard";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {AddQuestionComponent} from "./admin/add-question/add-question.component";
import {ViewTestResultComponent} from "./view-test-result/view-test-result.component";

const routes: Routes = [
  {path: "welcome", component: WelcomeComponent},
  {path: "", redirectTo: `/welcome`, pathMatch: 'full'},
  {path: "forgotPassword", component: ForgotPasswordComponent},
  {path: "resetPassword", component: ResetPasswordComponent},
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent , canActivate:[RouteGuardService]},

  {path:"manager/:name" ,component: ManagerComponent,canActivate:[RouteGuardService, ManagerGuard]},
  {path: "signup", component: SignupComponent},
  {path: "welcome/:name", component: StartTestComponent  ,canActivate:[RouteGuardService, UserGuard]},
  {
    path: "admin/:name", component: AdminComponent ,canActivate:[RouteGuardService,AdminGuard] ,
    children: [
      {path: 'add-question', component: AddQuestionComponent}
    ]
  },
  {path: "view-test-result", component: ViewTestResultComponent},
  {path: "**", component: ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
