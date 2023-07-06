import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowseJobsComponent } from './browse-jobs/browse-jobs.component';
import { CreateEmployeeProfileComponent } from './create-employee-profile/create-employee-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "home", component: HomePageComponent },
  { path: "browse-job-postings", component: BrowseJobsComponent },
  { path: "my-profile", component: CreateEmployeeProfileComponent },
  { path: "**", redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
