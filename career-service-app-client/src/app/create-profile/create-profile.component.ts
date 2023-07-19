import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateProfileService } from './create-profile.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrowseJobsService } from '../browse-jobs/browse-jobs.service';
import { Authority } from 'src/constants';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  candidateProfileForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    education: ['', Validators.required],
    experience: [0, Validators.required]
  });

  employerProfileForm: FormGroup = this.formBuilder.group({
    companyName: ['', Validators.required],
    website: ['', Validators.required]
  });

  selectedFile: File | null = null;

  loggedUser: any;
  resumeId: any;
  resumeExists: any;
  Authority: any;
  constructor(private formBuilder: FormBuilder, private createProfileService: CreateProfileService, private browseJobsService: BrowseJobsService, private _router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    // Check if the user is already logged in, if so, navigate to the home page
    this.Authority = Authority
    this.loggedUser = localStorage.getItem('user')
    this.loggedUser = JSON.parse(this.loggedUser)
    if (this.loggedUser == null) {
      this._router.navigateByUrl('/home');
    }
    if (this.loggedUser.authority === Authority.CANDIDATE) {
      this.candidateProfileForm.setValue({
        firstName: this.loggedUser.firstName,
        lastName: this.loggedUser.lastName,
        education: this.loggedUser.education,
        experience: this.loggedUser.experience
      })
    }
    if (this.loggedUser.authority === Authority.EMPLOYER) {
      this.employerProfileForm.setValue({
        companyName: this.loggedUser.companyName,
        website: this.loggedUser.website
      })
    }

    this.browseJobsService.isResumeExists(this.loggedUser.userId).subscribe(
      (res: any) => {
        this.resumeExists = res
        if (this.resumeExists) {
          this.createProfileService.downloadResume(this.loggedUser.userId).subscribe(
            (res: any) => {
              let url = window.URL.createObjectURL(res);
              let a = document.getElementById('downloadButton');
              if (a instanceof HTMLAnchorElement) {
                a.href = url;
                a.download = res.filename;
              }
            },
            (error: any) => { 
              this.toastr.error('Resume download failed', 'Download Failed');
            }
          );
        }
      },
      (error: any) => { 
        this.toastr.error('Error occured', 'Failed');
      }
    );
  }

  updateProfile() {
    if (this.loggedUser.authority === Authority.CANDIDATE && this.candidateProfileForm.valid) {
      console.log(this.candidateProfileForm.value);
      this.createProfileService.updateCandidateProfile(this.loggedUser.userId, this.candidateProfileForm.getRawValue()).subscribe(
        (res: any) => {
          this.loggedUser.firstName = res.firstName
          this.loggedUser.lastName = res.lastName
          this.loggedUser.experience = res.experience
          this.loggedUser.education = res.education
          localStorage.setItem("user", JSON.stringify(this.loggedUser))
          this.toastr.success('Updated candidate profile successfully', 'Update successfull');
          this._router.navigateByUrl('/my-profile')
        },
        (error: any) => { 
          this.toastr.error('Update candidate profile Failed', 'Update Failed');
        }
      );
    }
    if (this.loggedUser.authority === Authority.EMPLOYER && this.employerProfileForm.valid) {
      console.log(this.employerProfileForm.value);
      this.createProfileService.updateEmployerProfile(this.loggedUser.userId, this.employerProfileForm.getRawValue()).subscribe(
        (res: any) => {
          this.loggedUser.companyName = res.companyName
          this.loggedUser.website = res.website
          localStorage.setItem("user", JSON.stringify(this.loggedUser))
          this.toastr.success('Updated employer profile successfully', 'Update successfull');
          this._router.navigateByUrl('/my-profile')
        },
        (error: any) => { 
          this.toastr.error('Update employer profile Failed', 'Update Failed');
        }
      );
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.createProfileService.uploadResume(this.loggedUser.userId, formData).subscribe(
        (response: any) => {
          this.toastr.success('Resume successfully uploaded', 'Success'); // Show success message using Toastr
          this._router.navigateByUrl('/create-profile')
        },
        (error: any) => { 
          console.error('File upload failed', error);
        }
      );
    }
  }

  onGenerate() {
    this.createProfileService.generateResume(this.loggedUser.userId).subscribe(
      (response: any) => {
        this.toastr.success('Resume successfully Generated', 'Success'); // Show success message using Toastr
        this._router.navigateByUrl('/create-profile')
      },
      (error: any) => { 
        console.error('File upload failed', error);
      }
    );
  }

}
