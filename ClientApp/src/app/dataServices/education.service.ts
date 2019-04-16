import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { EducationItem } from '../models/education';
import { DataConfigModule } from './data-config';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private url = DataConfigModule.SERVER + '/api/educationItems';

  constructor(private http: HttpClient, private loginService: LoginService) { }

  async getEducationItem(id: number): Promise<EducationItem> {
    return await this.http.get<EducationItem>(`${this.url}/${id}`, this.loginService.httpOptions).toPromise();
  }

  async getEducationItems(): Promise<EducationItem[]> {
    let retval = this.http.get<EducationItem[]>(`${this.url}`, this.loginService.httpOptions).toPromise();
    return retval;
  }

  async getUserEducationItems(id: number): Promise<EducationItem[]> {
    return await this.http.get<EducationItem[]>(`${this.url}/users/${id}`, this.loginService.httpOptions).toPromise();
  }

  async addEducationItem(user: EducationItem): Promise<EducationItem> {
    let retval = this.http.post<EducationItem>(
      `${this.url}`,
      JSON.stringify(user),
      this.loginService.httpOptions).toPromise();
    return retval;
  }

  async updateEducationItem(user: EducationItem): Promise<void> {
    this.http.put<EducationItem>(`${this.url}/${user.id}`, JSON.stringify(user), this.loginService.httpOptions).toPromise();
  }

  async deleteEducationItem(id: number): Promise<void> {
    this.http.delete(`${this.url}/${id}`, this.loginService.httpOptions).toPromise();
  }
}
