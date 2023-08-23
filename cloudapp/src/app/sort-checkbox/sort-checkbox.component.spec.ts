import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortCheckboxComponent } from './sort-checkbox.component';

describe('SortCheckboxComponent', () => {
  let component: SortCheckboxComponent;
  let fixture: ComponentFixture<SortCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
