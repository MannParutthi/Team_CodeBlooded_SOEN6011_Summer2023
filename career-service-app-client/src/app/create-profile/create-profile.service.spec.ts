import { TestBed } from '@angular/core/testing';

import { CreateProfileService } from './create-profile.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateProfileService', () => {
  let service: CreateProfileService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [HttpClientTestingModule,]
    });
    service = TestBed.inject(CreateProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
