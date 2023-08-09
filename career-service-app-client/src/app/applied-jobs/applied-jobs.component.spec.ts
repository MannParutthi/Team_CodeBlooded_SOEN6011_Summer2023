import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AppliedJobsComponent } from './applied-jobs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppliedJobsService } from './applied-jobs.service';
import { of, throwError } from 'rxjs';

describe('AppliedJobsComponent', () => {
  let component: AppliedJobsComponent;
  let fixture: ComponentFixture<AppliedJobsComponent>;
  let appliedJobsServiceSpy: jasmine.SpyObj<AppliedJobsService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(
    waitForAsync(() => {
      const appliedJobsServiceMock = jasmine.createSpyObj('AppliedJobsService', [
        'getAllAppliedJobs',
        'getEmployer',
        'getJob',
      ]);

      const toastrMock = jasmine.createSpyObj('ToastrService', ['error']);

      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          RouterTestingModule,
          HttpClientTestingModule,
          ToastrModule.forRoot()
        ],
        declarations: [AppliedJobsComponent],
        providers: [
          { provide: AppliedJobsService, useValue: appliedJobsServiceMock },
          { provide: ToastrService, useValue: toastrMock },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedJobsComponent);
    component = fixture.componentInstance;
    appliedJobsServiceSpy = TestBed.inject(AppliedJobsService) as jasmine.SpyObj<AppliedJobsService>;
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch applied jobs on ngOnInit', () => {
    const mockAppliedJobs = [
      { employerId: '1', jobId: 'job1', status: 'Applied', id: 'app1' },
      { employerId: '2', jobId: 'job2', status: 'Shortlisted', id: 'app2' },
    ];

    const mockEmployerData = { /* mock employer data */ };
    const mockJobData = { /* mock job data */ };

    appliedJobsServiceSpy.getAllAppliedJobs.and.returnValue(of(mockAppliedJobs));
    appliedJobsServiceSpy.getEmployer.and.returnValue(of(mockEmployerData));
    appliedJobsServiceSpy.getJob.and.returnValue(of(mockJobData));

    component.ngOnInit();

    expect(appliedJobsServiceSpy.getAllAppliedJobs).toHaveBeenCalled();
    expect(appliedJobsServiceSpy.getEmployer).toHaveBeenCalledTimes(mockAppliedJobs.length);
    expect(appliedJobsServiceSpy.getJob).toHaveBeenCalledTimes(mockAppliedJobs.length);
  });

  it('should navigate to home if user is not logged in', () => {
    localStorage.removeItem('user');
    const navigateSpy = spyOn(component['_router'], 'navigateByUrl');

    component.ngOnInit();

    expect(navigateSpy).toHaveBeenCalledWith('/home');
});
});
