import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillProductComponent } from './bill-product.component';

describe('BillProductComponent', () => {
  let component: BillProductComponent;
  let fixture: ComponentFixture<BillProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillProductComponent]
    });
    fixture = TestBed.createComponent(BillProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
