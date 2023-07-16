import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.jobPostingForm.valid) {
      console.log(this.jobPostingForm.value);
      // Perform further actions (e.g., save to backend)
    }
  }

}
