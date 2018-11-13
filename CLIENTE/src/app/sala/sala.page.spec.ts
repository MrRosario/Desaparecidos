import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaPage } from './sala.page';

describe('SalaPage', () => {
  let component: SalaPage;
  let fixture: ComponentFixture<SalaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
