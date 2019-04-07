import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TechSkill } from '../models/tech-skill';
import { DataConfigModule } from './data-config';

@Injectable({
  providedIn: 'root'
})
export class TechSkillService {
  private url =  DataConfigModule.SERVER + '/api/techSkills';

  constructor(private http: HttpClient) { }

  getTechSkills(id: number): Observable<TechSkill[]> {
    const retval = this.http.get<TechSkill[]>(`${this.url}/users/${id}`);
    return retval;
  }
}
