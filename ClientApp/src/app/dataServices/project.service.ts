import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Project } from '../models/project';
import { DataConfigModule } from './data-config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private url = DataConfigModule.SERVER + '/api/projects';

  constructor(private http: HttpClient) { }

  getProject(id: number): Observable<Project> {
    let retval = this.http.get<Project>(`${this.url}/${id}`);
    return retval;
  }

  getProjects(): Observable<Project[]> {
    let retval = this.http.get<Project[]>(`${this.url}`);
    return retval;
  }

  getUserProjects(id: number): Observable<Project[]> {
    const retval = this.http.get<Project[]>(`${this.url}/users/${id}`);
    return retval;
  }

  addProject(user: Project): Observable<Project> {
    let retval = this.http.post<Project>(
      `${this.url}`,
      JSON.stringify(user),
      httpOptions);
    return retval;
  }

  updateProject(user: Project): void {
    this.http.put<Project>(`${this.url}/${user.id}`, JSON.stringify(user), httpOptions)
      .subscribe(resp => { return; });
  }

  deleteProject(id: number): void {
    this.http.delete(`${this.url}/${id}`, httpOptions)
      .subscribe(resp => { return; });
  }
}
