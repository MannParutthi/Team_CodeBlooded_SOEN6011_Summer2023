import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllEmployersComponent } from './admin-all-employers.component';

describe('AdminAllEmployersComponent', () => {
  let component: AdminAllEmployersComponent;
  let fixture: ComponentFixture<AdminAllEmployersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllEmployersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllEmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
