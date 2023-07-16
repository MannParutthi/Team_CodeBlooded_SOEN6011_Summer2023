import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployerService } from './employer-job-posting.service';

@Component({
  selector: 'app-browse-jobs',
  templateUrl: './employer-job-posting.component.html',
  styleUrls: ['./employer-job-posting.component.scss']
})
export class EmployerJobsComponent implements OnInit {

  employerId = "64ad482c8eda5e12c342472e";
  public employerJobInfo: any;
  error = null;
  success= "";

  jobsList = [{
      id: 1,
      position: 'Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      requirements : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.',
    },
    ]

  constructor(private employerSevice: EmployerService){
    this.employerSevice.getEmployerJobPostings(this.employerId).subscribe(data => {
      this.employerJobInfo = data;
      console.warn(data)
      this.jobsList.push(...this.employerJobInfo.content)
    },
    (error) => {
      this.error = error.message
    })
  }

  ngOnInit(): void {
  }

  updateJob(jobId: number) {
    console.log('applyToJob() called with jobId: ' + jobId);
    
  }

  deleteJob(jobId: number) {
    console.log('deleteJob() called with jobId: ' + jobId);
    this.employerSevice.deleteEmployerJobPostings(jobId).subscribe(data => {
      this.success = data
      this,this.jobsList = this.jobsList.filter(jobs => jobs.id !== jobId)
    },
    (error) => {
      this.error = error.message
    })
  }
}