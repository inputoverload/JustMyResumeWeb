import { TestBed } from '@angular/core/testing';

import { SkillCategoryService } from './skill-category.service';

describe('SkillCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SkillCategoryService = TestBed.get(SkillCategoryService);
    expect(service).toBeTruthy();
  });
});
