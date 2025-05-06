import { TestBed } from '@angular/core/testing';

import { UrlIdExtractorService } from './url-id-extractor.service';

describe('UrlIdExtractorService', () => {
  let service: UrlIdExtractorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlIdExtractorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
