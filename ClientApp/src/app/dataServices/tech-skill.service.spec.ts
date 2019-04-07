import { TestBed } from '@angular/core/testing';

import { TechSkillService } from './tech-skill.service';

describe('TechSkillService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TechSkillService = TestBed.get(TechSkillService);
    expect(service).toBeTruthy();
  });
});
