import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceComponent } from './licence.component';

describe('LicenceComponent', () => {
  let component: LicenceComponent;
  let fixture: ComponentFixture<LicenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicenceComponent]
    });
    fixture = TestBed.createComponent(LicenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
