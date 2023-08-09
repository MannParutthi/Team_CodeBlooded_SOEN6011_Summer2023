import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobPostingComponent } from './add-job-posting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('AddJobPostingComponent', () => {
  let component: AddJobPostingComponent;
  let fixture: ComponentFixture<AddJobPostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [ AddJobPostingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
