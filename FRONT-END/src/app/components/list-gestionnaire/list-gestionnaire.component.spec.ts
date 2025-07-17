import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGestionnaireComponent } from './list-gestionnaire.component';

describe('ListGestionnaireComponent', () => {
  let component: ListGestionnaireComponent;
  let fixture: ComponentFixture<ListGestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGestionnaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
