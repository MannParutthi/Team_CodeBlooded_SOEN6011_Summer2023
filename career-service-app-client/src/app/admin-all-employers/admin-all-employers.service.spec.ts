import { TestBed } from '@angular/core/testing';

import { AdminAllEmployersService } from './admin-all-employers.service';

describe('AdminAllEmployersService', () => {
  let service: AdminAllEmployersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAllEmployersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
