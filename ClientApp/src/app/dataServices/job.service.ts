import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Job } from '../models/job';
import { DataConfigModule } from './data-config';
import { DialogData } from "./user.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private url = DataConfigModule.SERVER + '/api/jobs';

  constructor(private http: HttpClient) { }

  getJob(id: number): Observable<Job> {
    let retval = this.http.get<Job>(`${this.url}/${id}`);
    return retval;
  }

  getJobs(): Observable<Job[]> {
    let retval = this.http.get<Job[]>(`${this.url}`);
    return retval;
  }

  getJobs(userId: number): Observable<Job[]> {
    let retval = this.http.get<Job[]>(`${this.url}\Users\${userId}`);
    return retval;
  }

  addJob(user: Job): Observable<Job> {
    let retval = this.http.post<Job>(
      `${this.url}`,
      JSON.stringify(user),
      httpOptions);
    return retval;
  }

  updateJob(user: Job): void {
    this.http.put<Job>(`${this.url}/${user.id}`, JSON.stringify(user), httpOptions)
      .subscribe(resp => { return; });
  }

  deleteJob(id: number): void {
    this.http.delete(`${this.url}/${id}`, httpOptions)
      .subscribe(resp => { return; });
  }
}
