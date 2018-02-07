import { TestBed, inject } from '@angular/core/testing';

import { CrossserviceService } from './crossservice.service';

describe('CrossserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrossserviceService]
    });
  });

  it('should be created', inject([CrossserviceService], (service: CrossserviceService) => {
    expect(service).toBeTruthy();
  }));
});
