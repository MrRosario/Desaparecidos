import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarPage } from './pesquisar.page';

describe('PesquisarPage', () => {
  let component: PesquisarPage;
  let fixture: ComponentFixture<PesquisarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
