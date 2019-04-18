import { Injectable } from '@angular/core';
import { HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { DataConfigModule } from './data-config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public url = DataConfigModule.SERVER + '/api/auth/login';
  private _JWT: string;

  get JWT(): string {
    this.buildToken();
    
    return this._JWT;
  }

  set JWT(token: string) {
    if (!token) return;

    this._JWT = token;
    localStorage.setItem("JWT", token);
  }

  buildToken() {
    if (this._JWT) return;

    if (localStorage.getItem("JWT")) {
      this._JWT = localStorage.getItem("JWT");
    }

    if (this.activeRoute.snapshot.fragment) {
      this._JWT = this.activeRoute.snapshot.fragment;
    }
  }

  constructor(private activeRoute: ActivatedRoute) {
    this.buildToken();
  }

  get httpOptions() 
  {
    let hh: HttpHeaders = new HttpHeaders();
    hh = hh.append('Authorization', 'Bearer ' + this.JWT);
    hh = hh.append('Accept', 'application/json');
    hh = hh.append('Content-Type', 'application/json');

    let retval = {
      headers: hh
    };

    return retval;
  }
}
