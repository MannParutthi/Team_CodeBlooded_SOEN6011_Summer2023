import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowseJobsComponent } from './browse-jobs.component';
import { BrowseJobsService } from './browse-jobs.service';
import { AppliedJobsService } from '../applied-jobs/applied-jobs.service';
import { FormBuilder } from '@angular/forms';


describe('BrowseJobsComponent', () => {
  let component: BrowseJobsComponent;
  let fixture: ComponentFixture<BrowseJobsComponent>;
  let toastrService: ToastrService;
  let browseJobsService: jasmine.SpyObj<BrowseJobsService>;
  let appliedJobsService: jasmine.SpyObj<AppliedJobsService>;

  beforeEach(async () => {
    const browseJobsSpy = jasmine.createSpyObj('BrowseJobsService', ['getAllJobs']);
    const appliedJobsSpy = jasmine.createSpyObj('AppliedJobsService', ['getEmployer']);

    await TestBed.configureTestingModule({
      declarations: [BrowseJobsComponent],
      imports: [RouterTestingModule, ToastrModule.forRoot()],
      providers: [
        FormBuilder,
        ToastrService,
        { provide: BrowseJobsService, useValue: browseJobsSpy },
        { provide: AppliedJobsService, useValue: appliedJobsSpy },
      ],
    }).compileComponents();

    browseJobsService = TestBed.inject(BrowseJobsService) as jasmine.SpyObj<BrowseJobsService>;
    appliedJobsService = TestBed.inject(AppliedJobsService) as jasmine.SpyObj<AppliedJobsService>;

    fixture = TestBed.createComponent(BrowseJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
