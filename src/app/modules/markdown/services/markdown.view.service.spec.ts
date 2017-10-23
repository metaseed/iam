import { TestBed, inject } from '@angular/core/testing';

import { Markdown.ViewService } from './markdown.view.service';

describe('Markdown.ViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Markdown.ViewService]
    });
  });

  it('should be created', inject([Markdown.ViewService], (service: Markdown.ViewService) => {
    expect(service).toBeTruthy();
  }));
});
