import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployerJobDetailComponent } from './employer-job-details.component';
import { EmployerJobDetailService } from './employer-job-details.service';
import { of } from 'rxjs';
import { EmployerService } from '../employer-job-posting/employer-job-posting.service';
import { CreateProfileService } from '../create-profile/create-profile.service';


describe('EmployerJobsComponent', () => {
  let component: EmployerJobDetailComponent;
  let fixture: ComponentFixture<EmployerJobDetailComponent>;
  let employerJobDetailService: jasmine.SpyObj<EmployerJobDetailService>;
  let employerService: jasmine.SpyObj<EmployerService>;
  let router: Router;
  const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

  beforeEach(waitForAsync (() => {
    const employerJobsComponentSpy = jasmine.createSpyObj('EmployerJobDetailService', [
      'getJobPostingsDetails',
      'getCandidateListForCurrentJob',
      'updateCandidateStatus'
    ]);

    const employerServiceComponentSpy = jasmine.createSpyObj('EmployerService', [
      'deleteEmployerJobPostings'
    ]);

    const createProfileComponentSpy = jasmine.createSpyObj('CreateProfileService', [
      'downloadResume'
    ]);

    TestBed.configureTestingModule({
      declarations: [ EmployerJobDetailComponent],
      imports : [
        HttpClientTestingModule, 
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        { provide: EmployerJobDetailService, useValue: employerJobsComponentSpy },
        { provide: EmployerService, useValue: employerServiceComponentSpy },
        { provide: CreateProfileService, useValue: createProfileComponentSpy }, // Use EmployerService, not EmployerJobsComponent
        { provide: Router, useValue: {
          navigate: jasmine.createSpy('navigateByUrl'),
          navigateByUrl: jasmine.createSpy('navigateByUrl')
        }},
        { provide: ToastrService, useValue: toastrSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ userId: '123', email: 'test@example.com' }));
    fixture = TestBed.createComponent(EmployerJobDetailComponent);
    component = fixture.componentInstance;
    employerJobDetailService = TestBed.inject(EmployerJobDetailService) as jasmine.SpyObj<EmployerJobDetailService>;
    employerService = TestBed.inject(EmployerService) as jasmine.SpyObj<EmployerService>;
   
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve job details and candidate list on ngOnInit', () => {
    const mockJob = {  "description": "Work with frontend team to develop a highly scalable web app",
    "employerId": "64ad482c8eda5e12c342472e",
    "id": "64b5b8d3507b801b549c690d",
    "location": "Toronto / Montreal",
    "position": "Backend engineer",
    "requirements": "2+ years experience in any backend framework",};
    
    const mockCandidates = { 
      candidates: [
        {   
          "applicationStatus": "REJECTED", 
          "candidate": {
          "authority": "ROLE_CANDIDATE",
          "education": "Masters",
          "emailId": "nipun@test.com",
          "experience": 3,
          "firstName": "Nipun",
          "lastName": "Hedaoo",
          "password": "password",
          "resumeId": "64bfcf6b2a2e1d293682c4e1",
          "userId": "64b739ff584291261ac7abdb" 
    }
    }
    ] 
};

    employerJobDetailService.getJobPostingsDetails.and.returnValue(of(mockJob));
    employerJobDetailService.getCandidateListForCurrentJob.and.returnValue(of(mockCandidates));

    component.ngOnInit();

    expect(employerJobDetailService.getJobPostingsDetails).toHaveBeenCalledWith(component.currentJobId);
    expect(component.job).toEqual(mockJob);
    expect(employerJobDetailService.getCandidateListForCurrentJob).toHaveBeenCalledWith(component.loggedUser.userId, component.currentJobId);
    expect(component.candidateList).toEqual(mockCandidates.candidates);
  });

  it('should update currentJobId and navigate to update-job-posting', () => {
    const jobId = 123;
    component.updateJob(jobId);

    expect(localStorage.getItem('currentJobId')).toBe(jobId.toString());
    expect(router.navigate).toHaveBeenCalledWith(['update-job-posting']);
  });

  it('should delete a job and show success message', () => {
    const jobId = 123;
    spyOn(window, 'confirm').and.returnValue(true);
    employerService.deleteEmployerJobPostings.and.returnValue(of('Deleted'));

    component.deleteJob(jobId);

    expect(employerService.deleteEmployerJobPostings).toHaveBeenCalledWith(jobId);
    expect(toastrSpy.error).toHaveBeenCalledWith('SuccessDeleted');
  });

  it('should change application status of a candidate', () => {
    const candidate = { firstName: 'John', userId: '456' };
    const newStatus = 'Shortlisted';

    component.onApplicationStatusChange(candidate, newStatus);

    expect(component.statusChanged.userId).toBe(candidate.userId);
    expect(component.statusChanged.status).toBe(newStatus);
  });

});

