import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrechirPlandComponent } from './enrechir-pland.component';

describe('EnrechirPlandComponent', () => {
  let component: EnrechirPlandComponent;
  let fixture: ComponentFixture<EnrechirPlandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrechirPlandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrechirPlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
