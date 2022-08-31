import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../testing/auth.service";
import {TokenService} from "../token/token.service";

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {


    constructor(public auth: TokenService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      request = request.clone({
        setHeaders: {
          // Authorization: `Bearer ${this.auth.getToken()}`
        }
      });

      return next.handle(request);
    }
}
