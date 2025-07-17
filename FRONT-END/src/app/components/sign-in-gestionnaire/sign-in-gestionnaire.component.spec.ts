import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInGestionnaireComponent } from './sign-in-gestionnaire.component';

describe('SignInGestionnaireComponent', () => {
  let component: SignInGestionnaireComponent;
  let fixture: ComponentFixture<SignInGestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInGestionnaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInGestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
