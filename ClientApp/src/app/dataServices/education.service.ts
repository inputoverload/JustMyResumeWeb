import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { EducationItem } from '../models/education';
import { DataConfigModule } from './data-config';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private url = DataConfigModule.SERVER + '/api/educationItems';

  constructor(private http: HttpClient) { }

  getEducationItems(id: number): Observable<EducationItem[]> {
    const retval = this.http.get<EducationItem[]>(`${this.url}/users/${id}`);
    return retval;
  }
}
