import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReqPaymentsComponent } from './list-req-payments.component';

describe('ListReqPaymentsComponent', () => {
  let component: ListReqPaymentsComponent;
  let fixture: ComponentFixture<ListReqPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReqPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReqPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
