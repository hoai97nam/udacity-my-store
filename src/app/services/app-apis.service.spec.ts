import { TestBed } from '@angular/core/testing';

import { AppApisService } from './app-apis.service';

describe('AppApisService', () => {
  let service: AppApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
