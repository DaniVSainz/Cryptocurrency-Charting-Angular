import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitPasswordResetComponent } from './submit-password-reset.component';

describe('SubmitPasswordResetComponent', () => {
  let component: SubmitPasswordResetComponent;
  let fixture: ComponentFixture<SubmitPasswordResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitPasswordResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
