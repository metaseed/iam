import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Markdown.EditorToolbarComponent } from './markdown.editor-toolbar.component';

describe('Markdown.EditorToolbarComponent', () => {
  let component: Markdown.EditorToolbarComponent;
  let fixture: ComponentFixture<Markdown.EditorToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Markdown.EditorToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Markdown.EditorToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
