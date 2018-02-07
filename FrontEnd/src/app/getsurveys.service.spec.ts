import { TestBed, inject } from '@angular/core/testing';

import { GetsurveysService } from './getsurveys.service';

describe('GetsurveysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetsurveysService]
    });
  });

  it('should be created', inject([GetsurveysService], (service: GetsurveysService) => {
    expect(service).toBeTruthy();
  }));
});
