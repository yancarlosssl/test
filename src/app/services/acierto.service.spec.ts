import { TestBed } from '@angular/core/testing';

import { AciertoService } from './acierto.service';

describe('AciertoService', () => {
  let service: AciertoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AciertoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
