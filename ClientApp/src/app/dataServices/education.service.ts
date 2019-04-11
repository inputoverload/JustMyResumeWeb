import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { EducationItem } from '../models/education';
import { DataConfigModule } from './data-config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private url = DataConfigModule.SERVER + '/api/educationItems';

  constructor(private http: HttpClient) { }

  getEducationItem(id: number): Observable<EducationItem> {
    let retval = this.http.get<EducationItem>(`${this.url}/${id}`);
    return retval;
  }

  getEducationItems(): Observable<EducationItem[]> {
    let retval = this.http.get<EducationItem[]>(`${this.url}`);
    return retval;
  }

  getUserEducationItems(id: number): Observable<EducationItem[]> {
    const retval = this.http.get<EducationItem[]>(`${this.url}/users/${id}`);
    return retval;
  }

  addEducationItem(user: EducationItem): Observable<EducationItem> {
    let retval = this.http.post<EducationItem>(
      `${this.url}`,
      JSON.stringify(user),
      httpOptions);
    return retval;
  }

  updateEducationItem(user: EducationItem): void {
    this.http.put<EducationItem>(`${this.url}/${user.id}`, JSON.stringify(user), httpOptions)
      .subscribe(resp => { return; });
  }

  deleteEducationItem(id: number): void {
    this.http.delete(`${this.url}/${id}`, httpOptions)
      .subscribe(resp => { return; });
  }
}
