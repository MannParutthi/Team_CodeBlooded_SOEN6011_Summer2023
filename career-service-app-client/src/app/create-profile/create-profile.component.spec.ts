import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateProfileComponent } from './create-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CreateProfileService } from './create-profile.service';
import { of } from 'rxjs';

describe('CreateProfileComponent', () => {
  let component: CreateProfileComponent;
  let fixture: ComponentFixture<CreateProfileComponent>;
  let createProfileServiceSpy: jasmine.SpyObj<CreateProfileService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;
  

  beforeEach(waitForAsync(() => {
    const createProfileServiceSpy = jasmine.createSpyObj('CreateProfileService', [
      'uploadResume',
      'downloadResume',
      'updateEmployerProfile',
      'updateCandidateProfile',
      'generateResume',
    ]);

     TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [ CreateProfileComponent ],
      providers: [
        { provide: CreateProfileService, useValue: createProfileServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
      ],
    })
    .compileComponents();
  }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CreateProfileComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize candidate profile form with default values', () => {
      expect(component.candidateProfileForm.value).toEqual({
          firstName: '',
          lastName: '',
          education: '',
          experience: 0
      });
});

  it('should initialize employer profile form with default values', () => {
    expect(component.employerProfileForm.value).toEqual({
        companyName: '',
        website: ''
    });
  });

  it('should update candidate profile successfully', () => {
    // Set up mock values
    const routerNavigateByUrlSpy = spyOn(component['_router'], 'navigateByUrl');
    const mockResponse = { /* mock response data */ };
    spyOn(createProfileServiceSpy, 'updateCandidateProfile').and.returnValue(of(mockResponse));

    // Update the candidate profile form
    component.candidateProfileForm.setValue({
        firstName: 'John',
        lastName: 'Doe',
        education: 'Bachelor Degree',
        experience: 3,
        email : "test@test.com"
    });

    // Call the updateProfile function
    component.updateProfile();

    // Expectations
    expect(createProfileServiceSpy.updateCandidateProfile).toHaveBeenCalledWith(component.updateUser.userId, component.candidateProfileForm.getRawValue());
    expect(toastrSpy.success).toHaveBeenCalledWith('Updated candidate profile successfully', 'Update successfull');
    expect(routerNavigateByUrlSpy).toHaveBeenCalledWith('/my-profile');
});
it('should update candidate profile', () => {
  // Simulate a logged-in user with candidate authority
  const user = {
    authority: 'CANDIDATE',
    userId: 1,
  };
  localStorage.setItem('user', JSON.stringify(user));

  // Simulate valid form input
  const formData = {
    firstName: 'John',
    lastName: 'Doe',
    education: 'Some Education',
    experience: 3,
  };
  component.candidateProfileForm.setValue(formData);

  // Simulate successful update
  createProfileServiceSpy.updateCandidateProfile.and.returnValue(of(formData));

  component.updateProfile();

  expect(createProfileServiceSpy.updateCandidateProfile).toHaveBeenCalledWith(
    user.userId,
    formData
  );
  expect(toastrSpy.success).toHaveBeenCalled();
});

it('should update employer profile', () => {
  // Simulate a logged-in user with employer authority
  const user = {
    authority: 'EMPLOYER',
    userId: 2,
  };
  localStorage.setItem('user', JSON.stringify(user));

  // Simulate valid form input
  const formData = {
    companyName: 'Acme Inc.',
    website: 'http://www.acme.com',
  };
  component.employerProfileForm.setValue(formData);

  // Simulate successful update
  createProfileServiceSpy.updateEmployerProfile.and.returnValue(of(formData));

  component.updateProfile();

  expect(createProfileServiceSpy.updateEmployerProfile).toHaveBeenCalledWith(
    user.userId,
    formData
  );
  expect(toastrSpy.success).toHaveBeenCalled();
});

it('should upload resume', () => {
  const user = {
    authority: 'CANDIDATE',
    userId: 1,
  };
  localStorage.setItem('user', JSON.stringify(user));

  const mockFile = new File(['test resume content'], 'resume.pdf', { type: 'application/pdf' });
  const event = { target: { files: [mockFile] } };

  createProfileServiceSpy.uploadResume.and.returnValue(of('Success'));

  component.onFileSelected(event);
  component.onUpload();

  expect(createProfileServiceSpy.uploadResume).toHaveBeenCalled();
  expect(toastrSpy.success).toHaveBeenCalled();
});

it('should generate resume', () => {
  const user = {
    authority: 'CANDIDATE',
    userId: 1,
  };
  localStorage.setItem('user', JSON.stringify(user));

  const mockPdfData = new Blob(['mock PDF data'], { type: 'application/pdf' });
  createProfileServiceSpy.generateResume.and.returnValue(of(mockPdfData));

  component.onGenerate();

  expect(createProfileServiceSpy.generateResume).toHaveBeenCalledWith(user.userId);
  expect(toastrSpy.success).toHaveBeenCalled();
  // Additional expectations for opening the generated PDF can be added if needed.
});

it('should not update employer profile with invalid form', () => {
  // Simulate a logged-in user with employer authority
  const user = {
    authority: 'EMPLOYER',
    userId: 2,
  };
  localStorage.setItem('user', JSON.stringify(user));

  // Simulate invalid form input (missing companyName)
  const formData = {
    companyName: '', // Invalid
    website: 'http://www.acme.com',
  };
  component.employerProfileForm.setValue(formData);

  component.updateProfile();

  expect(createProfileServiceSpy.updateEmployerProfile).not.toHaveBeenCalled();
  expect(toastrSpy.error).toHaveBeenCalled();
});

it('should show error when uploading invalid file type', () => {
  const user = {
    authority: 'CANDIDATE',
    userId: 1,
  };
  localStorage.setItem('user', JSON.stringify(user));

  const mockFile = new File(['test resume content'], 'resume.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  const event = { target: { files: [mockFile] } };

  component.onFileSelected(event);
  component.onUpload();

  expect(createProfileServiceSpy.uploadResume).not.toHaveBeenCalled();
  expect(toastrSpy.error).toHaveBeenCalled();
});

it('should show error when generating resume fails', () => {
  const user = {
    authority: 'CANDIDATE',
    userId: 1,
  };
  localStorage.setItem('user', JSON.stringify(user));

  component.onGenerate();

  expect(createProfileServiceSpy.generateResume).toHaveBeenCalled();
  expect(toastrSpy.error).toHaveBeenCalled();
});


it('should not update profile if user authority is not recognized', () => {
  const user = {
    authority: 'SOME_UNKNOWN_AUTHORITY',
    userId: 3,
  };
  localStorage.setItem('user', JSON.stringify(user));

  component.updateProfile();

  expect(createProfileServiceSpy.updateCandidateProfile).not.toHaveBeenCalled();
  expect(createProfileServiceSpy.updateEmployerProfile).not.toHaveBeenCalled();
});

it('should set updateUser correctly for admin updates', () => {
  const loggedUser = {
    authority: 'ADMIN',
  };
  const adminUpdateUser = {
    authority: 'CANDIDATE',
  };
  localStorage.setItem('user', JSON.stringify(loggedUser));
  localStorage.setItem('adminUserUpdate', JSON.stringify(adminUpdateUser));

  component.ngOnInit();

  expect(component.updateUser).toEqual(adminUpdateUser);
});

it('should download resume if it exists', () => {
  const user = {
    authority: 'CANDIDATE',
    userId: 1,
  };
  localStorage.setItem('user', JSON.stringify(user));
  createProfileServiceSpy.downloadResume.and.returnValue(of(new Blob()));

  component.ngOnInit();

  // Expectations for resume download should go here
});

it('should not download resume if it does not exist', () => {
  const user = {
    authority: 'CANDIDATE',
    userId: 1,
  };
  localStorage.setItem('user', JSON.stringify(user));

  component.ngOnInit();

  // Expectations for resume download should go here
});

});
