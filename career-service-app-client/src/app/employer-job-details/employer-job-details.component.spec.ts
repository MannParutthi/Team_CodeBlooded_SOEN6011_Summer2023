import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployerJobDetailComponent } from './employer-job-details.component';

describe('EmployerJobDetailComponent', () => {
  let component: EmployerJobDetailComponent;
  let fixture: ComponentFixture<EmployerJobDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerJobDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerJobDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
