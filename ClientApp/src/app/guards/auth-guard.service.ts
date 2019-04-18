import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../dataServices/login.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  path: import("@angular/router").ActivatedRouteSnapshot[];
  route: import("@angular/router").ActivatedRouteSnapshot;

  constructor( 
    private router: Router,
    private loginService: LoginService,
    private activeRoute: ActivatedRoute
  ) {
  }

  canActivate() {
    var jwtHelper: JwtHelperService = new JwtHelperService();

    if (this.loginService.JWT && !jwtHelper.isTokenExpired(this.loginService.JWT)) {
      return true;
    }

    if (this.activeRoute.snapshot.fragment) {
      this.loginService.JWT = this.activeRoute.snapshot.fragment;
      return true;
    }

    this.router.navigate(["login"]);
    return false;
  }

}
