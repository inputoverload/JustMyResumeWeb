import { Component } from '@angular/core';
import { LoginService } from './dataServices/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  JWT: string;

  constructor(
    private loginService: LoginService
  ) {
    this.JWT = this.loginService.JWT;
  }
}
