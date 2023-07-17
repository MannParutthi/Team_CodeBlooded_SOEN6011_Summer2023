import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployerService } from './employer-job-posting.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-browse-jobs',
  templateUrl: './employer-job-posting.component.html',
  styleUrls: ['./employer-job-posting.component.scss']
})
export class EmployerJobsComponent implements OnInit {

  public employerJobInfo: any;
  error = null;
  success= "";
  modal = false;
  loggedUser: any; // Variable to store the logged-in user details

  jobsList: any[] = [];

  constructor(private employerSevice: EmployerService ){}

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("user");
    this.loggedUser = JSON.parse(this.loggedUser);

    this.employerSevice.getEmployerJobPostings(this.loggedUser.userId).subscribe(
      (data) => {
        this.employerJobInfo = data;
        console.warn(data);
        this.jobsList.push(...this.employerJobInfo.content);
      },
      (error) => {
        this.error = error.message;
      }
    );
  }
  
  updateJob(jobId: number) {
    console.log('applyToJob() called with jobId: ' + jobId);
    this.modal = true;
  }

  deleteJob(jobId: number) {
    console.log('deleteJob() called with jobId: ' + jobId);
    this.employerSevice.deleteEmployerJobPostings(jobId).subscribe(
      (data) => {
        this.success = data;
        this.jobsList = this.jobsList.filter((jobs) => jobs.id !== jobId);
      },
      (error) => {
        this.error = error.message;
      }
    );
  }
}
