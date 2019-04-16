import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Project } from '../models/project';
import { DataConfigModule } from './data-config';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private url = DataConfigModule.SERVER + '/api/projects';

  constructor(private http: HttpClient, private loginService: LoginService) { }

  async getProject(id: number): Promise<Project> {
    let retval = await this.http.get<Project>(`${this.url}/${id}`, this.loginService.httpOptions).toPromise();
    return retval;
  }

  async getProjects(): Promise<Project[]> {
    let retval = await this.http.get<Project[]>(`${this.url}`, this.loginService.httpOptions).toPromise();
    return retval;
  }

  async getUserProjects(id: number): Promise<Project[]> {
    const retval = await this.http.get<Project[]>(`${this.url}/users/${id}`, this.loginService.httpOptions).toPromise();
    return retval;
  }

  async addProject(user: Project): Promise<Project> {
    let retval = await this.http.post<Project>(
      `${this.url}`,
      JSON.stringify(user),
      this.loginService.httpOptions).toPromise();
    return retval;
  }

  async updateProject(user: Project): Promise<void> {
    await this.http.put<Project>(`${this.url}/${user.id}`, JSON.stringify(user), this.loginService.httpOptions).toPromise();
  }

  async deleteProject(id: number): Promise<void> {
    await this.http.delete(`${this.url}/${id}`, this.loginService.httpOptions).toPromise();
  }
}
