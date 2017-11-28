import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingPositionIndicatorComponent } from './reading-position-indicator.component';

describe('ReadingPositionIndicatorComponent', () => {
  let component: ReadingPositionIndicatorComponent;
  let fixture: ComponentFixture<ReadingPositionIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingPositionIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingPositionIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
