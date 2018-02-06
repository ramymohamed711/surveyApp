import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsurveysComponent } from './showsurveys.component';

describe('ShowsurveysComponent', () => {
  let component: ShowsurveysComponent;
  let fixture: ComponentFixture<ShowsurveysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowsurveysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
