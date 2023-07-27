import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJobPostingComponent } from './update-job-posting.component';

describe('UpdateobPostingComponent', () => {
  let component: UpdateJobPostingComponent;
  let fixture: ComponentFixture<UpdateJobPostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
