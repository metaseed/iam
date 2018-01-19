import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderToolbarComponent } from './reader-toolbar.component';

describe('ReaderToolbarComponent', () => {
  let component: ReaderToolbarComponent;
  let fixture: ComponentFixture<ReaderToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReaderToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
