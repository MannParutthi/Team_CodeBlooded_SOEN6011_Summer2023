import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseCandidatesComponent } from './browse-candidates.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('BrowseCandidatesComponent', () => {
  let component: BrowseCandidatesComponent;
  let fixture: ComponentFixture<BrowseCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ BrowseCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
