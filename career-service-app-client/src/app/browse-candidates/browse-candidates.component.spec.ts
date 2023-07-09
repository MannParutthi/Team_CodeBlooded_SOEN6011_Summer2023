import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseCandidatesComponent } from './browse-candidates.component';

describe('BrowseCandidatesComponent', () => {
  let component: BrowseCandidatesComponent;
  let fixture: ComponentFixture<BrowseCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
