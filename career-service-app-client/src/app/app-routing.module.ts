import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowseJobsComponent } from './browse-jobs/browse-jobs.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { BrowseCandidatesComponent } from './browse-candidates/browse-candidates.component';
import { AddJobPostingComponent } from './add-job-posting/add-job-posting.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "home", component: HomePageComponent },
  { path: "browse-job-postings", component: BrowseJobsComponent },
  { path: "my-profile", component: CreateProfileComponent },
  { path: "add-job-posting", component: AddJobPostingComponent },
  { path: "browse-candidates", component: BrowseCandidatesComponent },
  { path: "**", redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
