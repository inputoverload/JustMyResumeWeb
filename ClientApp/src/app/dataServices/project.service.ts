import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Project } from '../models/project';
import { DataConfigModule } from './data-config';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private url = DataConfigModule.SERVER + '/api/projects';

  constructor(private http: HttpClient) { }

  getProjects(id: number): Observable<Project[]> {
    const retval = this.http.get<Project[]>(`${this.url}/users/${id}`);
    return retval;
  }
}