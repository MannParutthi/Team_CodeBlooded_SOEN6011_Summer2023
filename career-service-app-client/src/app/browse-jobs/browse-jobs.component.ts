import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrowseJobsService } from './browse-jobs.service';
import { Job } from 'src/models/Job';
import { Employer } from 'src/models/Employer';

@Component({
  selector: 'app-browse-jobs',
  templateUrl: './browse-jobs.component.html',
  styleUrls: ['./browse-jobs.component.scss']
})
export class BrowseJobsComponent implements OnInit {

  allJobsList: Array<Job> = []
  jobsList = [
    {
      jobId: 1,
      title: 'Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      date: '2 days ago',
      salaryRange: '$100,000 - $120,000'
    },
    {
      jobId: 2,
      title: 'Software Engineer',
      company: 'Facebook',
      location: 'Menlo Park, CA',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      date: '2 days ago',
      salaryRange: '$100,000 - $120,000'
    },
    {
      jobId: 3,
      title: 'Software Engineer',
      company: 'Apple',
      location: 'Cupertino, CA',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      date: '2 days ago',
      salaryRange: '$100,000 - $120,000'
    },
    {
      jobId: 4,
      title: 'Software Engineer',
      company: 'Amazon',
      location: 'Seattle, WA',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      date: '2 days ago',
      salaryRange: '$100,000 - $120,000'
    },
    {
      jobId: 5,
      title: 'Software Engineer',
      company: 'Microsoft',
      location: 'Redmond, WA',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      date: '2 days ago',
      salaryRange: '$100,000 - $120,000'
    },
    {
      jobId: 6,
      title: 'Software Engineer',
      company: 'Netflix',
      location: 'Los Gatos, CA',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      date: '2 days ago',
      salaryRange: '$100,000 - $120,000'
    }
  ]

  constructor(private toastr: ToastrService, private _router: Router, private browseJobService: BrowseJobsService) { }

  loggedUser: any; // Variable to store the logged-in user details
  
  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("user"); // Get user data from local storage
    this.loggedUser = JSON.parse(this.loggedUser)
    if (!this.loggedUser) {
      this._router.navigateByUrl('/home'); // If user is not logged in, redirect to the home page
    }
    this.browseJobService.getAllJobs().subscribe(
      (res: any) => {
        console.log(res)
        for (let index = 0, length = res.content.length; index < length; index += 1) {
          const element = res.content[index];
          // get employer from employerId field
          const job = new Job
          const employer = new Employer
          employer.companyName = "DEMO GSP"
          job.description = element.description
          job.id = element.id
          job.location = element.location
          job.position = element.position
          job.requirements = element.requirements
          job.employer = employer
          this.allJobsList.push(job)
        }
      },
      (error: any) => { 
        console.error('Fetching application failed', error);
      }
    );
  }

  applyToJob(jobId: string) {
    this.browseJobService.isResumeExists(this.loggedUser.userId).subscribe(
      (res: any) => {
        console.log(res)
        if (!res) {
          this.toastr.error('Please upload the resume first before applying to the job.');
          return
        }
        this.browseJobService.applyToJob(this.loggedUser.userId, jobId).subscribe(
          (res: any) => {
            console.log(res)
            this.toastr.success('Job applied successfully', 'Success'); // Show success message using Toastr
          },
          (error: any) => {
            this.toastr.error('Job application failed and Already applied for the job');
          }
        );
      },
      (error: any) => { 
        console.error('API call failed', error);
        return
      }
    );
  }
}
