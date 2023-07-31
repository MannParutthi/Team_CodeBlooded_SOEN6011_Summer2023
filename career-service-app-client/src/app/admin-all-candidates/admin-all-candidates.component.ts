import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdminAllCandidatesService } from './admin-all-candidates.service';

@Component({
  selector: 'app-admin-all-candidates',
  templateUrl: './admin-all-candidates.component.html',
  styleUrls: ['./admin-all-candidates.component.scss']
})
export class AdminAllCandidatesComponent implements OnInit {

  public employerJobInfo: any;
  loggedUser: any; // Variable to store the logged-in user details
  candidatesList: any[] = [];

  constructor(private adminCandidateService: AdminAllCandidatesService, private router : Router, private toastr: ToastrService ){}

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("user");
    this.loggedUser = JSON.parse(this.loggedUser);

    this.adminCandidateService.getAllCandidates().subscribe(
      (data: any) => {
        this.candidatesList = data.content;
        console.warn(data);
      },
      (error: any) => {
        this.toastr.error('Error occured' + error.message);
      }
    );
  }

  updateCandidate(candidateId: number) {
    console.log('updateCandidate() called with empId: ' + candidateId);
    this.adminCandidateService.getCandidate(candidateId).subscribe(
      (data: any) => {
        console.info(data);
        data.authority = data.authority.substring(5,6).toUpperCase() + data.authority.substring(6).toLowerCase()
        localStorage.setItem("adminUserUpdate", JSON.stringify(data))
      },
      (error: any) => {
        this.toastr.error('Error occured' + error.message);
      }
    );
    localStorage.setItem("currentCandidateId", candidateId.toString());
    this.router.navigate(['my-profile']);
  }

  deleteCandidate(candidateId: number) {
    console.log('deleteCandidate() called with candidateId: ' + candidateId);
    this.adminCandidateService.deleteCandidate(candidateId).subscribe(
      (data) => {
        this.candidatesList = this.candidatesList.filter((emp) => emp.userId !== candidateId);
        this.toastr.success(data.message);
      },
      (error) => {
        this.toastr.error('Error occured: ' + error.message);
      }
    );
  }

}
