import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardSkillsComponent } from './wizard-skills.component';

describe('WizardSkillsComponent', () => {
  let component: WizardSkillsComponent;
  let fixture: ComponentFixture<WizardSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
