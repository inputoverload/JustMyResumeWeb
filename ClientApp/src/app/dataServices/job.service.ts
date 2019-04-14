import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Job } from '../models/job';
import { DataConfigModule } from './data-config';
import { DialogData } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private url = DataConfigModule.SERVER + '/api/jobs';

  constructor(private http: HttpClient) { }

  async getJob(id: number): Promise<Job> {
    let retval = this.http.get<Job>(`${this.url}/${id}`, DataConfigModule.httpOptions).toPromise();
    return retval;
  }

  async getJobs(): Promise<Job[]> {
    let retval = this.http.get<Job[]>(`${this.url}`, DataConfigModule.httpOptions).toPromise();
    return retval;
  }

  async getUserJobs(userId: number): Promise<Job[]> {
    let retval = this.http.get<Job[]>(`${this.url}/Users/${userId}`, DataConfigModule.httpOptions).toPromise();
    return retval;
  }

  async addJob(user: Job): Promise<Job> {
    let retval = this.http.post<Job>(
      `${this.url}`,
      JSON.stringify(user),
      DataConfigModule.httpOptions).toPromise();
    return retval;
  }

  async updateJob(user: Job): Promise<void> {
    this.http.put<Job>(`${this.url}/${user.id}`, JSON.stringify(user), DataConfigModule.httpOptions).toPromise();
  }

  async deleteJob(id: number): Promise<void> {
    this.http.delete(`${this.url}/${id}`, DataConfigModule.httpOptions).toPromise();
  }
}
