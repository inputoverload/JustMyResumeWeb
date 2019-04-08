import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardProjectComponent } from './wizard-project.component';

describe('WizardProjectComponent', () => {
  let component: WizardProjectComponent;
  let fixture: ComponentFixture<WizardProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
