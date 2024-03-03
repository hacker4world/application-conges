import { TestBed } from '@angular/core/testing';

import { ServiceCrService } from './service-cr.service';

describe('ServiceCrService', () => {
  let service: ServiceCrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
