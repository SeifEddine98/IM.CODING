import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhotoProfilAComponent } from './update-photo-profil-a.component';

describe('UpdatePhotoProfilAComponent', () => {
  let component: UpdatePhotoProfilAComponent;
  let fixture: ComponentFixture<UpdatePhotoProfilAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePhotoProfilAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePhotoProfilAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
