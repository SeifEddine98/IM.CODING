import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCongeFComponent } from './list-conge-f.component';

describe('ListCongeFComponent', () => {
  let component: ListCongeFComponent;
  let fixture: ComponentFixture<ListCongeFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCongeFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCongeFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
