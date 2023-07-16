import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  loggedUser: any; // Stores the logged-in user data

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("user"); // Get user data from local storage
    this.loggedUser = JSON.parse(this.loggedUser); // Parse the logged-in user data
  }

}
