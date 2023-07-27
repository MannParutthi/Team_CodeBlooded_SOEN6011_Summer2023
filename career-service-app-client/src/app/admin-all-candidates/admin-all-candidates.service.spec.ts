import { TestBed } from '@angular/core/testing';

import { AdminAllCandidatesService } from './admin-all-candidates.service';

describe('AdminAllCandidatesService', () => {
  let service: AdminAllCandidatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAllCandidatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
