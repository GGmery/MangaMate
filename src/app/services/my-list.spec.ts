import { TestBed } from '@angular/core/testing';

import { MyList } from './my-list';

describe('MyList', () => {
  let service: MyList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
