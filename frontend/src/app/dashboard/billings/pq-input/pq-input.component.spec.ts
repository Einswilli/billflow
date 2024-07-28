import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqInputComponent } from './pq-input.component';

describe('PqInputComponent', () => {
  let component: PqInputComponent;
  let fixture: ComponentFixture<PqInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PqInputComponent]
    });
    fixture = TestBed.createComponent(PqInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
