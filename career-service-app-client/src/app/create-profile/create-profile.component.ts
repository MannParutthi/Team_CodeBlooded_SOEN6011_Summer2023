import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateProfileService } from './create-profile.service';

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

  constructor(private formBuilder: FormBuilder, private createProfileService: CreateProfileService) { }

  ngOnInit(): void {
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
      this.createProfileService.uploadResume('candiateid', formData).subscribe(
        (response: any) => {
          console.log('File uploaded successfully');
          // Perform further actions upon successful upload
        },
        (error: any) => {
          console.error('File upload failed', error);
          // Handle error cases
        }
      );
    }
  }

}
