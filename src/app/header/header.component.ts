import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  user = sessionStorage.getItem('authenticatorUser');

  constructor(private authenticationService: AuthenticationService,
              private route:ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // this.user= this.route.snapshot.params['name'];
  }

  activateLinks() {
    return (this.authenticationService.isUserLoggedIn() && this.authenticationService.isUserEmployee());
  }
  activeLinkToLogout(){
    return this.authenticationService.isUserLoggedIn();
  }

  showManagerDashboard() {
    return this.authenticationService.isUserLoggedIn() && this.authenticationService.isUserManager();
  }
  showAdminDashboard() {
    return this.authenticationService.isUserLoggedIn() && this.authenticationService.isUserAdmin();
  }
}
