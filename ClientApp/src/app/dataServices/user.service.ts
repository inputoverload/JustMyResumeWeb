import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataConfigModule } from './data-config';

import { User } from '../models/user';
import { LoginService } from './login.service';

export interface DialogData
{
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = DataConfigModule.SERVER + '/api/users';

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  async getUser(id: number): Promise<User> {
    return await this.http.get<User>(`${this.url}/${id}`, this.loginService.httpOptions).toPromise<User>();
  }

  async getUsers(): Promise<User[]> {
    let retval = await this.http.get<User[]>(`${this.url}`, this.loginService.httpOptions).toPromise();
    return retval;
  }

  async addUser(user: User): Promise<User> {
    let retval = await this.http.post<User>(
      `${this.url}`, 
      JSON.stringify(user), 
      this.loginService.httpOptions).toPromise();
    return retval;
  }

  async updateUser(user: User): Promise<void> {
    await this.http.put<User>(`${this.url}/${user.id}`, JSON.stringify(user), this.loginService.httpOptions).toPromise();
  }

  async deleteUser(id: number): Promise<void> {
    await this.http.delete(`${this.url}/${id}`, this.loginService.httpOptions)
      .toPromise();
  }
}
