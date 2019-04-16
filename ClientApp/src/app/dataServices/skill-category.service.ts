import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SkillCategory } from '../models/skill-category';
import { DataConfigModule } from './data-config';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SkillCategoryService {
  private url = DataConfigModule.SERVER + '/api/skillCategories';
  
  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  async getSkillCategories(): Promise<SkillCategory[]> {
    const retval = await this.http.get<SkillCategory[]>(this.url, this.loginService.httpOptions).toPromise();
    return retval;
  }
}
