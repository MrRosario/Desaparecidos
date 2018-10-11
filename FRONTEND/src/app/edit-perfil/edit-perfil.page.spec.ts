import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPerfilPage } from './edit-perfil.page';

describe('EditPerfilPage', () => {
  let component: EditPerfilPage;
  let fixture: ComponentFixture<EditPerfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPerfilPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
