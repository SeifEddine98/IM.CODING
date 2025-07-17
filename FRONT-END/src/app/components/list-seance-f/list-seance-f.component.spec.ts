import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSeanceFComponent } from './list-seance-f.component';

describe('ListSeanceFComponent', () => {
  let component: ListSeanceFComponent;
  let fixture: ComponentFixture<ListSeanceFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSeanceFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSeanceFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
