import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseJobsComponent } from './browse-jobs.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('BrowseJobsComponent', () => {
  let component: BrowseJobsComponent;
  let fixture: ComponentFixture<BrowseJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [RouterTestingModule, ToastrModule.forRoot(),  HttpClientTestingModule, ReactiveFormsModule, ],
      declarations: [ BrowseJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
