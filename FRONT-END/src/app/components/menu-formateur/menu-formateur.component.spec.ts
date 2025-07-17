import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFormateurComponent } from './menu-formateur.component';

describe('MenuFormateurComponent', () => {
  let component: MenuFormateurComponent;
  let fixture: ComponentFixture<MenuFormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuFormateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
