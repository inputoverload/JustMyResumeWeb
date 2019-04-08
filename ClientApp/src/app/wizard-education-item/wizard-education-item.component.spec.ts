import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardEducationItemComponent } from './wizard-education-item.component';

describe('WizardEducationItemComponent', () => {
  let component: WizardEducationItemComponent;
  let fixture: ComponentFixture<WizardEducationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardEducationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardEducationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
