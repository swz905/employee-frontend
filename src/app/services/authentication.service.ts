import { Injectable } from '@angular/core';
import {EmployeeService} from "./data/employee.service";
import {Employee} from "../shared/employee";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public userCredentials:Employee =new Employee(0,'','','',
    0,false,'',0,'');

  constructor(private employeeService: EmployeeService, private router:Router) { }


  authentication(email: string, password: string) {
    this.employeeService
      .getEmployeeByEmail( email,password)
      .subscribe(
        response=>{
          this.userCredentials = response
        },
          error => {
          this.router.navigate(['/error']);
        }
      )

    if (email === this.userCredentials.email && password ===this.userCredentials.password){

      sessionStorage.setItem('authenticatorUser',this.userCredentials.name);
      sessionStorage.setItem('authenticatorRole',this.userCredentials.empType);
      sessionStorage.setItem('authenticatorEmail',this.userCredentials.email);
      return true;
    }
    return false;
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticatorUser');
    return !(user===null);
  }

  logoutUser(){
    sessionStorage.removeItem('authenticatorRole');
    sessionStorage.removeItem('authenticatorUser');
    sessionStorage.removeItem('authenticatorEmail');
    sessionStorage.clear();

  }
  isUserAdmin(){
    let role = sessionStorage.getItem('authenticatorRole');
    return role==="admin";
  }

  isUserManager(){
    let role = sessionStorage.getItem('authenticatorRole');
    return role==="manager";

  }
  isUserEmployee(){
    let role = sessionStorage.getItem('authenticatorRole');
    return role==="employee";
  }


}
