import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileAComponent } from './update-profile-a.component';

describe('UpdateProfileAComponent', () => {
  let component: UpdateProfileAComponent;
  let fixture: ComponentFixture<UpdateProfileAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfileAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProfileAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
