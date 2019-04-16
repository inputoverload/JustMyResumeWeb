import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TechSkill } from '../models/tech-skill';
import { DataConfigModule } from './data-config';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TechSkillService {
  private url =  DataConfigModule.SERVER + '/api/techSkills';

  constructor(private http: HttpClient, private loginService: LoginService) { }

  async getTechSkill(id: number): Promise<TechSkill> {
    let retval = this.http.get<TechSkill>(`${this.url}/${id}`, this.loginService.httpOptions).toPromise();
    return retval;
  }

  async getTechSkills(): Promise<TechSkill[]> {
    let retval = this.http.get<TechSkill[]>(`${this.url}`, this.loginService.httpOptions).toPromise();
    return retval;
  }

  async getUserTechSkills(id: number): Promise<TechSkill[]> {
    const retval = this.http.get<TechSkill[]>(`${this.url}/users/${id}`, this.loginService.httpOptions).toPromise();
    return retval;
  }

  async addTechSkill(item: TechSkill): Promise<TechSkill> {
    let retval = this.http.post<TechSkill>(
      `${this.url}`,
      JSON.stringify(item),
      this.loginService.httpOptions).toPromise();
    return retval;
  }

  async updateTechSkill(item: TechSkill): Promise<void> {
    this.http.put<TechSkill>(`${this.url}/${item.id}`, JSON.stringify(item), this.loginService.httpOptions).toPromise();
  }

  async deleteTechSkill(id: number): Promise<void> {
    this.http.delete(`${this.url}/${id}`, this.loginService.httpOptions).toPromise();
  }
}
