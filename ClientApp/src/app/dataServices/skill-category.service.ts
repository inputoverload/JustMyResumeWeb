import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SkillCategory } from '../models/skill-category';
import { DataConfigModule } from './data-config';

@Injectable({
  providedIn: 'root'
})
export class SkillCategoryService {
  private url = DataConfigModule.SERVER + '/api/skillCategories';
  
  constructor(private http: HttpClient) {
  }

  async getSkillCategories(): Promise<SkillCategory[]> {
    const retval = await this.http.get<SkillCategory[]>(this.url, DataConfigModule.httpOptions).toPromise();
    return retval;
  }
}
