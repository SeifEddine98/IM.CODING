import { TestBed } from '@angular/core/testing';

import { GestionnaireGuard } from './gestionnaire.guard';

describe('GestionnaireGuard', () => {
  let guard: GestionnaireGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GestionnaireGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
