import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TechSkill } from '../models/tech-skill';
import { DataConfigModule } from './data-config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TechSkillService {
  private url =  DataConfigModule.SERVER + '/api/techSkills';

  constructor(private http: HttpClient) { }

  getTechSkill(id: number): Observable<TechSkill> {
    let retval = this.http.get<TechSkill>(`${this.url}/${id}`);
    return retval;
  }

  getTechSkills(): Observable<TechSkill[]> {
    let retval = this.http.get<TechSkill[]>(`${this.url}`);
    return retval;
  }

  getUserTechSkills(id: number): Observable<TechSkill[]> {
    const retval = this.http.get<TechSkill[]>(`${this.url}/users/${id}`);
    return retval;
  }

  addTechSkill(item: TechSkill): Observable<TechSkill> {
    let retval = this.http.post<TechSkill>(
      `${this.url}`,
      JSON.stringify(item),
      httpOptions);
    return retval;
  }

  updateTechSkill(item: TechSkill): void {
    this.http.put<TechSkill>(`${this.url}/${item.id}`, JSON.stringify(item), httpOptions)
      .subscribe(resp => { return; });
  }

  deleteTechSkill(id: number): void {
    this.http.delete(`${this.url}/${id}`, httpOptions)
      .subscribe(resp => { return; });
  }
}
