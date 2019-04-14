import { Injectable } from '@angular/core';

import { DataConfigModule } from './data-config';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public url = DataConfigModule.SERVER + '/api/auth/login';
  public invalidLogin: boolean = true;

  constructor() {}


}
