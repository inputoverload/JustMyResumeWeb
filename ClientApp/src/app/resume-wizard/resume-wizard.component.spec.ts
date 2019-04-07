import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeWizardComponent } from './resume-wizard.component';

describe('ResumeWizardComponent', () => {
  let component: ResumeWizardComponent;
  let fixture: ComponentFixture<ResumeWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
