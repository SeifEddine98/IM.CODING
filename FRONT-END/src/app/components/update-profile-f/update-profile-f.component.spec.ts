import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileFComponent } from './update-profile-f.component';

describe('UpdateProfileFComponent', () => {
  let component: UpdateProfileFComponent;
  let fixture: ComponentFixture<UpdateProfileFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfileFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProfileFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
