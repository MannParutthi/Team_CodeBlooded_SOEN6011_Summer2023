import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'career-service-app-client';

  constructor(public _router: Router) { }
  
  loggedUser: any; // Variable to store the logged-in user details
  
  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("user"); // Get user data from local storage
  }

  logout() {
    localStorage.clear(); // Clear the user data from local storage
    this._router.navigateByUrl('/home'); // Navigate to the login page
    window.location.reload()
  }

}
