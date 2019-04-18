import { Component, OnInit, Injectable } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { LoginService } from '../dataServices/login.service';
import { MaterialModule } from '../material';
import { Observable } from 'rxjs';
import { ResumeSummaryComponent } from '../resume-summary/resume-summary.component';

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

 login(form: NgForm) {

   try {
     let token = this.http.post<JWTTokenString>(
       `${this.loginService.url}`,
       JSON.stringify(form.value),
       httpOptions
     ).subscribe(item => this.loginService.JWT = item.token,
       err => console.warn("Error authenticting: " + err.message),
       () => this.goHome()
     );

   } catch (error)
   {
     console.warn("Error logging in: " + error.message);
   }
  } 

  goHome() {
    this.router.navigateByUrl("/resume/1", { fragment: this.loginService.JWT });
  }

}

interface JWTTokenString {
  token: string;
}
