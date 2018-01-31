import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodemirrorToolbarComponent } from './codemirror-toolbar.component';

describe('CodemirrorToolbarComponent', () => {
  let component: CodemirrorToolbarComponent;
  let fixture: ComponentFixture<CodemirrorToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodemirrorToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodemirrorToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
