import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSignInComponent } from './navbar-sign-in.component';

describe('NavbarSignInComponent', () => {
  let component: NavbarSignInComponent;
  let fixture: ComponentFixture<NavbarSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarSignInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
