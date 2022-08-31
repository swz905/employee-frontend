import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {Employee} from "../shared/employee";
import {AuthService} from "../services/testing/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:any
  name:any
  password:any
  errorMessage:string = "Invalid Login credentials";
  invalidLogin: boolean = false;
  empType:any


  constructor(private authenticationService: AuthenticationService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {

  }


  handleLogin(){

    if(this.authenticationService.authentication(this.email, this.password)){
      if(sessionStorage.getItem("authenticatorRole")==="admin") {
        this.router.navigate(['/admin', this.authenticationService.userCredentials.name]);
        this.invalidLogin = false;
      }
      else if(sessionStorage.getItem("authenticatorRole")==="manager") {
        this.router.navigate(['/manager', this.authenticationService.userCredentials.name]);
        this.invalidLogin = false;
      }
      else if(sessionStorage.getItem("authenticatorRole")==="employee") {
        if(!this.authenticationService.userCredentials.firstLogin) {
          let email1 = this.authenticationService.userCredentials.email;
          let token1 = this.authenticationService.userCredentials.token;
          console.log(email1, token1);
          this.router.navigateByUrl(`/resetPassword?token=${token1}&email=${email1}`);
        }
      else{
          this.router.navigate(['/welcome', this.authenticationService.userCredentials.name]);
          this.invalidLogin = false;
        }
      }
    }
    else{
      this.router.navigate(['/error'])
      this.invalidLogin = true;
    }

  }

}
