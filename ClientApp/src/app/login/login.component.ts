import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';


import { LoginService } from '../dataServices/login.service';
import { MaterialModule } from '../material';
import { Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private http: HttpClient 
  ) { }

  ngOnInit() {
  }

 async login(form: NgForm) {

   try {
     let token = await this.http.post<JWTTokenString>(
       `${this.loginService.url}`,
       JSON.stringify(form.value),
       httpOptions
     ).toPromise();

     this.loginService.JWT = token.token;
     this.invalidLogin = false;
     this.goHome();
   } catch (error)
   {
     this.invalidLogin = true;
     console.warn("Error logging in: " + error.message);
   }
  } 

  goHome() {
    this.router.navigateByUrl("/");
  }

}

interface JWTTokenString {
  token: string;
}
