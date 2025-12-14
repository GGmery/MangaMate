import { TestBed } from '@angular/core/testing';

import { Jikan } from './jikan';

describe('Jikan', () => {
  let service: Jikan;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Jikan);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
