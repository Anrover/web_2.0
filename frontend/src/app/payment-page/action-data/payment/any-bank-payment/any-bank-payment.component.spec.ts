import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyBankPaymentComponent } from './any-bank-payment.component';

describe('AnyBankPaymentComponent', () => {
  let component: AnyBankPaymentComponent;
  let fixture: ComponentFixture<AnyBankPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyBankPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyBankPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
