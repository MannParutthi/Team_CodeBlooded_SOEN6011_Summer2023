import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EmployerService } from '../employer-job-posting/employer-job-posting.service';
import { BrowseJobsService } from '../browse-jobs/browse-jobs.service';

@Component({
  selector: 'app-admin-all-jobs',
  templateUrl: './admin-all-jobs.component.html',
  styleUrls: ['./admin-all-jobs.component.scss']
})
export class AdminAllJobsComponent implements OnInit {

  public employerJobInfo: any;
  loggedUser: any; // Variable to store the logged-in user details
  jobsList: any[] = [];

  constructor(private browseJobsService: BrowseJobsService, private employerService: EmployerService, private router : Router, private toastr: ToastrService ){}

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("user");
    this.loggedUser = JSON.parse(this.loggedUser);

    this.browseJobsService.getAllJobs().subscribe(
      (data) => {
        this.employerJobInfo = data;
        console.warn(data);
        this.jobsList.push(...this.employerJobInfo.content);
      },
      (error) => {
        this.toastr.error('Error occured' + error.message);
      }
    );
  }

  updateJob(jobId: number) {
    console.log('applyToJob() called with jobId: ' + jobId);
    localStorage.setItem("currentJobId", jobId.toString());
    this.router.navigate(['update-job-posting']);
  }

  deleteJob(jobId: number) {
    console.log('deleteJob() called with jobId: ' + jobId);
    this.employerService.deleteEmployerJobPostings(jobId).subscribe(
      (data) => {
        this.jobsList = this.jobsList.filter((jobs) => jobs.id !== jobId);
        this.toastr.success('Success' + data);
      },
      (error) => {
        this.toastr.error('Error occured' + error.message);
      }
    );
  }

  showDetails(jobId: number){
    console.log('showDetails() called with jobId: ' + jobId);
    localStorage.setItem("currentJobId", jobId.toString());
    this.router.navigate(['employer-job-detail']);
  }

}
