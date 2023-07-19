import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateProfileService } from './create-profile.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrowseJobsService } from '../browse-jobs/browse-jobs.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  profileForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required, Validators.pattern('^[0-9]*$')]
  });

  selectedFile: File | null = null;

  loggedUser: any;
  resumeId: any;
  resumeExists: any;
  constructor(private formBuilder: FormBuilder, private createProfileService: CreateProfileService, private browseJobsService: BrowseJobsService, private _router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    // Check if the user is already logged in, if so, navigate to the home page
    this.loggedUser = localStorage.getItem('user')
    this.loggedUser = JSON.parse(this.loggedUser)
    if (this.loggedUser == null) {
      this._router.navigateByUrl('/home');
    }
    this.browseJobsService.isResumeExists(this.loggedUser.userId).subscribe(
      (res: any) => {
        this.resumeExists = res
        if (this.resumeExists) {
          this.createProfileService.downloadResume(this.loggedUser.userId).subscribe(
            (res: any) => {
              console.log(res)
              let url = window.URL.createObjectURL(res);
              let a = document.getElementById('downloadButton');
              if (a instanceof HTMLAnchorElement) {
                a.href = url;
                a.download = res.filename;
              }
            },
            (error: any) => { 
              console.error('File download failed', error);
            }
          );
        }
      },
      (error: any) => { 
        console.error('API call failed', error);
        return
      }
    );
  }

  createProfile() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      // Perform further actions (e.g., save to backend)
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      console.log(formData, this.selectedFile);
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
