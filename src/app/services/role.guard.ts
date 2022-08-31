import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {


  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

  if (this.authenticationService.isUserAdmin()) {
  return true;
}

this.router.navigate(['/login']);
return false;
}

}

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {


  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.authenticationService.isUserManager()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}


@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {


  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.authenticationService.isUserEmployee()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.authenticationService.isUserAdmin()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}

