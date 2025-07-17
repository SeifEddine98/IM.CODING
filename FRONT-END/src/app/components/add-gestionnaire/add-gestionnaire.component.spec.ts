import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGestionnaireComponent } from './add-gestionnaire.component';

describe('AddGestionnaireComponent', () => {
  let component: AddGestionnaireComponent;
  let fixture: ComponentFixture<AddGestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGestionnaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
