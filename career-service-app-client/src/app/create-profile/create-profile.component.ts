import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  profileForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required, Validators.pattern('^[0-9]*$')]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  createProfile() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      // Perform further actions (e.g., save to backend)
    }
  }

}
