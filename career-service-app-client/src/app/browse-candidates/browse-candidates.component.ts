import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-candidates',
  templateUrl: './browse-candidates.component.html',
  styleUrls: ['./browse-candidates.component.scss']
})
export class BrowseCandidatesComponent implements OnInit {

  candidatesList = [
    {
      candidateId: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
      resume: "path/to/resume1.pdf",
      coverLetter: "path/to/cover_letter1.pdf"
    },
    {
      candidateId: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "9876543210",
      resume: "path/to/resume2.pdf",
      coverLetter: "path/to/cover_letter2.pdf"
    },
    {
      candidateId: 3,
      name: "David Johnson",
      email: "davidjohnson@example.com",
      phone: "5555555555",
      resume: "path/to/resume3.pdf",
      coverLetter: "path/to/cover_letter3.pdf"
    },
    {
      candidateId: 4,
      name: "Emily Davis",
      email: "emilydavis@example.com",
      phone: "1111111111",
      resume: "path/to/resume4.pdf",
      coverLetter: "path/to/cover_letter4.pdf"
    },
    {
      candidateId: 5,
      name: "Michael Wilson",
      email: "michaelwilson@example.com",
      phone: "9999999999",
      resume: "path/to/resume5.pdf",
      coverLetter: "path/to/cover_letter5.pdf"
    },
    {
      candidateId: 6,
      name: "Sophia Anderson",
      email: "sophiaanderson@example.com",
      phone: "7777777777",
      resume: "path/to/resume6.pdf",
      coverLetter: "path/to/cover_letter6.pdf"
    },
    {
      candidateId: 7,
      name: "Daniel Thompson",
      email: "danielthompson@example.com",
      phone: "4444444444",
      resume: "path/to/resume7.pdf",
      coverLetter: "path/to/cover_letter7.pdf"
    }
  ]

  constructor(private _router: Router) { }

  loggedUser: any; // Variable to store the logged-in user details
  
  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("user"); // Get user data from local storage
    if (!this.loggedUser) {
      this._router.navigateByUrl('/login'); // If user is not logged in, redirect to the login page
    }
  }

  inviteCandidate(candidateId: number) {
    console.log("Inviting candidate with id " + candidateId);
  }

}
