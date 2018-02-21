import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceActionComponent } from './choice-action.component';

describe('ChoiceActionComponent', () => {
  let component: ChoiceActionComponent;
  let fixture: ComponentFixture<ChoiceActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
