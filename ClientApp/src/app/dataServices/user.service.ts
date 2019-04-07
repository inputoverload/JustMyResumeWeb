import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataConfigModule } from './data-config';

import { User } from '../models/user';
import { MaterialModule } from '../material';

export interface DialogData
{
  userId: number;
}

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = DataConfigModule.SERVER + '/api/users';

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    let retval = this.http.get<User>(`${this.url}/${id}`);
    return retval;
  }

  getUsers(): Observable<User> {
    let retval = this.http.get<User>(`${this.url}`);
    return retval;
  }

  addUser(user: User): Observable<User> {
    let retval = this.http.post<User>(
      `${this.url}`, 
      JSON.stringify(user), 
      httpOptions);
    return retval;
  }

  updateUser(user: User): void {
    this.http.put<User>(`${this.url}/${user.id}`, JSON.stringify(user), httpOptions)
    .subscribe(resp => {return;});
  }
}
