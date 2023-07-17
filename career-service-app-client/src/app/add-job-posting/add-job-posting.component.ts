import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddJobService } from './add-job-posting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-job-posting',
  templateUrl: './add-job-posting.component.html',
  styleUrls: ['./add-job-posting.component.scss']
})
export class AddJobPostingComponent implements OnInit {

  employerId = "64ad482c8eda5e12c342472e";
  error = null;
  success= null;
  request = {};

  jobPostingForm: FormGroup = this.formBuilder.group({
    // jobId: ['', Validators.required],
    position: ['', Validators.required],
    // company: ['', Validators.required],
    location: ['', Validators.required],
    description: ['', Validators.required],
    requirements: ['', Validators.required],
    // salaryRange: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private addJobService: AddJobService, private _router: Router) { }

  loggedUser: any; // Variable to store the logged-in user details
  
  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("user"); // Get user data from local storage
    if (!this.loggedUser) {
      this._router.navigateByUrl('/home'); // If user is not logged in, redirect to the login page
    }
  }

  onSubmit() {
    console.warn("Submit")
    if (this.jobPostingForm.valid) {
      console.warn("Submit : Valid Form" + this.jobPostingForm.getRawValue())
      this.request = {
        ...this.jobPostingForm.getRawValue(),
        "employerId" : this.employerId
      }
      this.addJobService.addJobPosting(this.employerId, this.request ).subscribe(data => {
        this.success = data
        console.log(data)
      },
      (error) => {
        this.error = error.message
        console.error(error.message)
      })
    }else{
      console.warn("Submit : Invalid Form" )
    }
  }

}
