import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployerJobsComponent } from './employer-job-posting.component';

describe('EmployerJobsComponent', () => {
  let component: EmployerJobsComponent;
  let fixture: ComponentFixture<EmployerJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
