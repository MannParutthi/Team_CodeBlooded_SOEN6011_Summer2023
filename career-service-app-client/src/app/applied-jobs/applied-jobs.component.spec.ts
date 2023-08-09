import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedJobsComponent } from './applied-jobs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('AppliedJobsComponent', () => {
  let component: AppliedJobsComponent;
  let fixture: ComponentFixture<AppliedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [ AppliedJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
