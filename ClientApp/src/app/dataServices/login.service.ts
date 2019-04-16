import { Injectable } from '@angular/core';
import { HttpHeaders, HttpHeaderResponse } from '@angular/common/http';

import { DataConfigModule } from './data-config';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public url = DataConfigModule.SERVER + '/api/auth/login';

  public JWT: string;

  constructor() { }

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
