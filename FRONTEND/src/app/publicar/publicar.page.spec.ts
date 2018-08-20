import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarPage } from './publicar.page';

describe('PublicarPage', () => {
  let component: PublicarPage;
  let fixture: ComponentFixture<PublicarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
