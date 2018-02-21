import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicePaymentMethodComponent } from './choice-payment-method.component';

describe('ChoicePaymentMethodComponent', () => {
  let component: ChoicePaymentMethodComponent;
  let fixture: ComponentFixture<ChoicePaymentMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicePaymentMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicePaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
