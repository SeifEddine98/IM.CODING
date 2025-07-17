import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBeginComponent } from './menu-begin.component';

describe('MenuBeginComponent', () => {
  let component: MenuBeginComponent;
  let fixture: ComponentFixture<MenuBeginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBeginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBeginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
