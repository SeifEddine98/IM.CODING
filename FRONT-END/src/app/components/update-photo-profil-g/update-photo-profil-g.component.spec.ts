import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhotoProfilGComponent } from './update-photo-profil-g.component';

describe('UpdatePhotoProfilGComponent', () => {
  let component: UpdatePhotoProfilGComponent;
  let fixture: ComponentFixture<UpdatePhotoProfilGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePhotoProfilGComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePhotoProfilGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
