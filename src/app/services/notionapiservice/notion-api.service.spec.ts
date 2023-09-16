import { TestBed } from '@angular/core/testing';

import { NotionAPIService } from './notion-api.service';

describe('NotionAPIService', () => {
  let service: NotionAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotionAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
