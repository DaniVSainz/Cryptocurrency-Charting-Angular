import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendEmailVerificationComponent } from './resend-email-verification.component';

describe('ResendEmailVerificationComponent', () => {
  let component: ResendEmailVerificationComponent;
  let fixture: ComponentFixture<ResendEmailVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResendEmailVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
