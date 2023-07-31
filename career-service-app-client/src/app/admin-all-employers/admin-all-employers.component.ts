import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdminAllEmployersService } from './admin-all-employers.service';

@Component({
  selector: 'app-admin-all-employers',
  templateUrl: './admin-all-employers.component.html',
  styleUrls: ['./admin-all-employers.component.scss']
})
export class AdminAllEmployersComponent implements OnInit {

  public employerJobInfo: any;
  loggedUser: any; // Variable to store the logged-in user details
  employersList: any[] = [];

  constructor(private adminEmployerService: AdminAllEmployersService, private router : Router, private toastr: ToastrService ){}

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("user");
    this.loggedUser = JSON.parse(this.loggedUser);
    if (this.loggedUser == null) {
      this.router.navigateByUrl('/home');
    }

    this.adminEmployerService.getAllEmployers().subscribe(
      (data: any) => {
        this.employersList = data;
        console.warn(data);
      },
      (error: any) => {
        this.toastr.error('Error occured' + error.message);
      }
    );
  }

  updateEmp(empId: number) {
    console.log('updateEmp() called with empId: ' + empId);
    this.adminEmployerService.getEmployer(empId).subscribe(
      (data: any) => {
        console.info(data);
        data.authority = data.authority.substring(5,6).toUpperCase() + data.authority.substring(6).toLowerCase()
        localStorage.setItem("adminUserUpdate", JSON.stringify(data))
        this.router.navigate(['my-profile'])
      },
      (error: any) => {
        this.toastr.error('Error occured' + error.message);
      }
    );
  }

  deleteEmp(empId: number) {
    console.log('deleteEmp() called with jobId: ' + empId);
    this.adminEmployerService.deleteEmployer(empId).subscribe(
      (data) => {
        this.employersList = this.employersList.filter((emp) => emp.employerId !== empId);
        this.toastr.success(data.message);
      },
      (error) => {
        this.toastr.error('Error occured: ' + error.message);
      }
    );
  }

}
