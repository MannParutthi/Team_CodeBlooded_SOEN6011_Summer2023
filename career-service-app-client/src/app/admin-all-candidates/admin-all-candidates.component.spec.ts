import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllCandidatesComponent } from './admin-all-candidates.component';

describe('AdminAllCandidatesComponent', () => {
  let component: AdminAllCandidatesComponent;
  let fixture: ComponentFixture<AdminAllCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
