import { TestBed, inject } from '@angular/core/testing';

import { MarkdownViewer.ServiceService } from './markdown-viewer.service.service';

describe('MarkdownViewer.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkdownViewer.ServiceService]
    });
  });

  it('should be created', inject([MarkdownViewer.ServiceService], (service: MarkdownViewer.ServiceService) => {
    expect(service).toBeTruthy();
  }));
});
