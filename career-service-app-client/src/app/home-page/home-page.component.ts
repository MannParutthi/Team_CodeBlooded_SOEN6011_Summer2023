import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authority } from 'src/constants';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  loggedUser: any; // Stores the logged-in user data
  Authority: any;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.Authority = Authority;
    this.loggedUser = localStorage.getItem("user"); // Get user data from local storage
    this.loggedUser = JSON.parse(this.loggedUser); // Parse the logged-in user data
    localStorage.removeItem("authority")
  }

  login(authority: string) {
    localStorage.setItem("authority", authority)
    this._router.navigateByUrl('/login');
  }

}
