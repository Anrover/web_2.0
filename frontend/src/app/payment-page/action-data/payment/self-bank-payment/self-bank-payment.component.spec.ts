import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfBankPaymentComponent } from './self-bank-payment.component';

describe('SelfBankPaymentComponent', () => {
  let component: SelfBankPaymentComponent;
  let fixture: ComponentFixture<SelfBankPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfBankPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfBankPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
