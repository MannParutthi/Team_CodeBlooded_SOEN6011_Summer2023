import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { AddJobPostingComponent } from './add-job-posting.component';
import { AddJobService } from './add-job-posting.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddJobPostingComponent', () => {
  let component: AddJobPostingComponent;
  let fixture: ComponentFixture<AddJobPostingComponent>;
  let addJobServiceSpy: jasmine.SpyObj<AddJobService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    addJobServiceSpy = jasmine.createSpyObj('AddJobService', ['addJobPosting']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    TestBed.configureTestingModule({
      declarations: [AddJobPostingComponent],
      imports: [ReactiveFormsModule,
        HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot()
      ],
      providers: [
        { provide: AddJobService, useValue: addJobServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ToastrService, useValue: toastrSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddJobPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit valid form', () => {
    // Set up mock values and return values
    const mockFormValue = {
      position: 'Software Developer',
      location: 'New York',
      description: 'Job description',
      requirements: 'Job requirements',
    };
    component.jobPostingForm.setValue(mockFormValue);
    addJobServiceSpy.addJobPosting.and.returnValue(of({ message: 'Job posted successfully' }));

    // Call the onSubmit function
    component.onSubmit();

    // Expectations
    expect(addJobServiceSpy.addJobPosting).toHaveBeenCalledWith(component.employerId, jasmine.objectContaining(mockFormValue));
    expect(toastrSpy.success).toHaveBeenCalledWith('Job posting created successfully', 'Job posted successfully');
    // expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('employer-job-posting');
  });

  it('should handle form submission failure', () => {
    // Set up mock values and return an error
    const mockFormValue = {
      position: 'Software Developer',
      location: 'New York',
      description: 'Job description',
      requirements: 'Job requirements',
    };
    component.jobPostingForm.setValue(mockFormValue);
    const errorMessage = 'Job posting creation failed';
    addJobServiceSpy.addJobPosting.and.returnValue(throwError({ message: errorMessage }));

    // Call the onSubmit function
    component.onSubmit();

    // Expectations
    expect(addJobServiceSpy.addJobPosting).toHaveBeenCalledWith(component.employerId, jasmine.objectContaining(mockFormValue));
    expect(toastrSpy.error).toHaveBeenCalledWith('Create new job posting failed', errorMessage);
  });

  it('should not submit invalid form', () => {
    // Call the onSubmit function without setting form values

    // Call the onSubmit function
    component.onSubmit();

    // Expectations
    expect(addJobServiceSpy.addJobPosting).not.toHaveBeenCalled();
    expect(toastrSpy.success).not.toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });
});
