import { TestBed } from '@angular/core/testing';

import { Imageservice } from './imageservice';

describe('Imageservice', () => {
  let service: Imageservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Imageservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
