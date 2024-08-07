import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Http404Component } from './http404.component';

describe('Http404Component', () => {
  let component: Http404Component;
  let fixture: ComponentFixture<Http404Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Http404Component]
    });
    fixture = TestBed.createComponent(Http404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
