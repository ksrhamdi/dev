import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpactionComponent } from './addpaction.component';

describe('AddpactionComponent', () => {
  let component: AddpactionComponent;
  let fixture: ComponentFixture<AddpactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
