import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavIndicatorComponent } from './nav-indicator.component';

describe('NavIndicatorComponent', () => {
  let component: NavIndicatorComponent;
  let fixture: ComponentFixture<NavIndicatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavIndicatorComponent]
    });
    fixture = TestBed.createComponent(NavIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
