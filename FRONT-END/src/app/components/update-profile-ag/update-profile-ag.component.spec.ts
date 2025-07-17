import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileAGComponent } from './update-profile-ag.component';

describe('UpdateProfileAGComponent', () => {
  let component: UpdateProfileAGComponent;
  let fixture: ComponentFixture<UpdateProfileAGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfileAGComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProfileAGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
