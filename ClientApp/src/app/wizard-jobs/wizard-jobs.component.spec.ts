import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardJobsComponent } from './wizard-jobs.component';

describe('WizardJobsComponent', () => {
  let component: WizardJobsComponent;
  let fixture: ComponentFixture<WizardJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
