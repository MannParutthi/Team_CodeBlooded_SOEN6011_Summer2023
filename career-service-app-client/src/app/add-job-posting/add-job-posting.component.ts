import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-job-posting',
  templateUrl: './add-job-posting.component.html',
  styleUrls: ['./add-job-posting.component.scss']
})
export class AddJobPostingComponent implements OnInit {

  jobPostingForm: FormGroup = this.formBuilder.group({
    jobId: ['', Validators.required],
    title: ['', Validators.required],
    company: ['', Validators.required],
    location: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    salaryRange: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private _router: Router) { }

  loggedUser: any; // Variable to store the logged-in user details
  
  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("user"); // Get user data from local storage
    if (!this.loggedUser) {
      this._router.navigateByUrl('/home'); // If user is not logged in, redirect to the login page
    }
  }

  onSubmit() {
    if (this.jobPostingForm.valid) {
      console.log(this.jobPostingForm.value);
      // Perform further actions (e.g., save to backend)
    }
  }

}
