import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardUserComponent } from './wizard-user.component';

describe('WizardUserComponent', () => {
  let component: WizardUserComponent;
  let fixture: ComponentFixture<WizardUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
