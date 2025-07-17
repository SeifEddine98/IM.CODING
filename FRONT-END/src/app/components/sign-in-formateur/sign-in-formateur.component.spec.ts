import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInFormateurComponent } from './sign-in-formateur.component';

describe('SignInFormateurComponent', () => {
  let component: SignInFormateurComponent;
  let fixture: ComponentFixture<SignInFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInFormateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
