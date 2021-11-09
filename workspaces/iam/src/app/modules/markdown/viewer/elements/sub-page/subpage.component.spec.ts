import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubPageComponent } from './subpage.component';

describe('SubPageComponent', () => {
  let component: SubPageComponent;
  let fixture: ComponentFixture<SubPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});