import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee-profile',
  templateUrl: './create-employee-profile.component.html',
  styleUrls: ['./create-employee-profile.component.scss']
})
export class CreateEmployeeProfileComponent implements OnInit {

  employeeProfileForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required, Validators.pattern('^[0-9]*$')]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  createProfile() {
    if (this.employeeProfileForm.valid) {
      console.log(this.employeeProfileForm.value);
      // Perform further actions (e.g., save to backend)
    }
  }

}
