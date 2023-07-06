import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browse-jobs',
  templateUrl: './browse-jobs.component.html',
  styleUrls: ['./browse-jobs.component.scss']
})
export class BrowseJobsComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

  applyToJob(jobId: number) {
    console.log('applyToJob() called with jobId: ' + jobId);
  }

}
