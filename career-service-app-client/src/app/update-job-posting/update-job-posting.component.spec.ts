import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJobPostingComponent } from './update-job-posting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('UpdateobPostingComponent', () => {
  let component: UpdateJobPostingComponent;
  let fixture: ComponentFixture<UpdateJobPostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot()],
      declarations: [ UpdateJobPostingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateJobPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
