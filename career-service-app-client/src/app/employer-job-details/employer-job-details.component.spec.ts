import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EmployerJobDetailComponent } from './employer-job-details.component';
import { ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployerJobDetailService } from './employer-job-details.service';
import { CreateProfileService } from '../create-profile/create-profile.service';
import { of, throwError } from 'rxjs';

describe('EmployerJobDetailComponent', () => {
  let component: EmployerJobDetailComponent;
  let fixture: ComponentFixture<EmployerJobDetailComponent>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let jobDetailServiceSpy: jasmine.SpyObj<EmployerJobDetailService>;
  let createProfileServiceSpy: jasmine.SpyObj<CreateProfileService>;

  beforeEach(() => {
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    
    const jobDetailServiceSpy = jasmine.createSpyObj('EmployerJobDetailService', [
      'getJobPostingsDetails',
      'getCandidateListForCurrentJob',
      'updateCandidateStatus',
    ]);
    jobDetailServiceSpy.getJobPostingsDetails.and.returnValue(of({})); // Mock the response for getJobPostingsDetails method
    jobDetailServiceSpy.getCandidateListForCurrentJob.and.returnValue(of({})); // Mock the response for getCandidateListForCurrentJob method
    jobDetailServiceSpy.updateCandidateStatus.and.returnValue(of({})); // Mock the response for updateCandidateStatus method
    jobDetailServiceSpy.deleteEmployerJobPostings.and.returnValue(of({})); // Mock the response for deleteEmployerJobPostings method

    createProfileServiceSpy = jasmine.createSpyObj('CreateProfileService', ['downloadResume']);
    createProfileServiceSpy.downloadResume.and.returnValue(of(new Blob())); // Mock the response for downloadResume method

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [EmployerJobDetailComponent],
      providers: [
        { provide: ToastrService, useValue: toastrSpy },
        { provide: EmployerJobDetailService, useValue: jobDetailServiceSpy },
        { provide: CreateProfileService, useValue: createProfileServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployerJobDetailComponent);
    component = fixture.componentInstance;
  });

  it('should download the resume', fakeAsync(() => {
    // Test the downloadResume method
    component.downloadResume('123');
    tick();
    expect(toastrServiceSpy.error).not.toHaveBeenCalled();
  }));

  it('should handle resume download error', fakeAsync(() => {
    // Test the downloadResume method with an error
    createProfileServiceSpy.downloadResume.and.returnValue(throwError(new Error('Download failed')));
    component.downloadResume('123');
    tick();
    expect(toastrServiceSpy.error).toHaveBeenCalledWith('Resume download failed', 'Download Failed');
  }));

  // Add more test cases for other methods of the component as needed.
});
