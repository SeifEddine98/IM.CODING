import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhotoProfilFComponent } from './update-photo-profil-f.component';

describe('UpdatePhotoProfilFComponent', () => {
  let component: UpdatePhotoProfilFComponent;
  let fixture: ComponentFixture<UpdatePhotoProfilFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePhotoProfilFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePhotoProfilFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
