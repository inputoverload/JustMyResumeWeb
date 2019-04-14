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

  async getTechSkill(id: number): Promise<TechSkill> {
    let retval = this.http.get<TechSkill>(`${this.url}/${id}`, DataConfigModule.httpOptions).toPromise();
    return retval;
  }

  async getTechSkills(): Promise<TechSkill[]> {
    let retval = this.http.get<TechSkill[]>(`${this.url}`, DataConfigModule.httpOptions).toPromise();
    return retval;
  }

  async getUserTechSkills(id: number): Promise<TechSkill[]> {
    const retval = this.http.get<TechSkill[]>(`${this.url}/users/${id}`, DataConfigModule.httpOptions).toPromise();
    return retval;
  }

  async addTechSkill(item: TechSkill): Promise<TechSkill> {
    let retval = this.http.post<TechSkill>(
      `${this.url}`,
      JSON.stringify(item),
      DataConfigModule.httpOptions).toPromise();
    return retval;
  }

  async updateTechSkill(item: TechSkill): Promise<void> {
    this.http.put<TechSkill>(`${this.url}/${item.id}`, JSON.stringify(item), DataConfigModule.httpOptions).toPromise();
  }

  async deleteTechSkill(id: number): Promise<void> {
    this.http.delete(`${this.url}/${id}`, DataConfigModule.httpOptions).toPromise();
  }
}
