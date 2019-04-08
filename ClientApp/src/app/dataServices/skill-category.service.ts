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

  getSkillCategories(): Observable<SkillCategory[]> {
    const retval = this.http.get<SkillCategory[]>(this.url);
    return retval;
  }
}
