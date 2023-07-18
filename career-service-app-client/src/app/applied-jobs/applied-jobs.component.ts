import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppliedJobsService } from './applied-jobs.service';
import { Application } from './../../models/Application';
import { Employer } from 'src/models/Employer';
import { Job } from 'src/models/Job';
import { Candidate } from 'src/models/Candidate';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss']
})
export class AppliedJobsComponent implements OnInit {

  appliedJobsList: Array<Application> = [];
  jobsList = [
    {
      jobId: 1,
      title: 'Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      date: '2 days ago',
      salaryRange: '$100,000 - $120,000',
      status: 'Applied'
    },
    {
      jobId: 2,
      title: 'Software Engineer',
      company: 'Facebook',
      location: 'Menlo Park, CA',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      date: '2 days ago',
      salaryRange: '$100,000 - $120,000',
      status: 'Applied'
    },
    {
      jobId: 3,
      title: 'Software Engineer',
      company: 'Apple',
      location: 'Cupertino, CA',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      date: '2 days ago',
      salaryRange: '$100,000 - $120,000',
      status: 'Applied'
    },
    {
      jobId: 4,
      title: 'Software Engineer',
      company: 'Amazon',
      location: 'Seattle, WA',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      date: '2 days ago',
      salaryRange: '$100,000 - $120,000',
      status: 'Applied'
    },
    {
      jobId: 5,
      title: 'Software Engineer',
      company: 'Microsoft',
      location: 'Redmond, WA',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      date: '2 days ago',
      salaryRange: '$100,000 - $120,000',
      status: 'Applied'
    },
    {
      jobId: 6,
      title: 'Software Engineer',
      company: 'Netflix',
      location: 'Los Gatos, CA',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      date: '2 days ago',
      salaryRange: '$100,000 - $120,000',
      status: 'Applied'
    }
  ]

  constructor(private _router: Router, private appliedJobsService: AppliedJobsService, private toastr: ToastrService) { }

  loggedUser: any; // Variable to store the logged-in user details
  application: Application = new Application;
  job: Job = new Job;
  employer: Employer = new Employer;
  candidate: Candidate = new Candidate;

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("user"); // Get user data from local storage
    this.loggedUser = JSON.parse(this.loggedUser)
    if (!this.loggedUser) {
      this._router.navigateByUrl('/home'); // If user is not logged in, redirect to the login page
    }
    this.appliedJobsService.getAllAppliedJobs(this.loggedUser.userId).subscribe(
      (res: any) => {
        console.log(res)
        for (let index = 0, length = res.length; index < length; index += 1) {
          const element = res[index];
          this.job = new Job
          this.employer = new Employer
          this.candidate = new Candidate
          this.application = new Application
          this.appliedJobsService.getEmployer(element.employerId).subscribe(
            (response: any) => {
              this.employer = response
              this.appliedJobsService.getJob(element.jobId).subscribe(
                (response: any) => {
                  console.log(response)
                  this.job = response
                  this.application.id = element.id
                  this.application.employer = this.employer
                  this.application.job = this.job
                  this.application.status = element.status
                  this.appliedJobsList.push(this.application)
                },
                (error: any) => { 
                  console.log(error)
                  this.toastr.error('Error occured');
                  this._router.navigateByUrl('/home')
                }
              );
            },
            (error: any) => { 
              console.log(error)
              this.toastr.error('Error occured');
              this._router.navigateByUrl('/home')
            }
          );
        }
      },
      (error: any) => {
        this.toastr.error('Error occured')
        this._router.navigateByUrl('/home')
      }
    );
  }
}
