import { TestBed } from '@angular/core/testing';

import { AuthsvcService } from './authsvc.service';

describe('AuthsvcService', () => {
  let service: AuthsvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthsvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
