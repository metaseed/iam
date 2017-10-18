import { Component, OnInit } from '@angular/core';

import { MarkdownItService } from '../components';

@Component({
    selector: 'markdown',
    template: '<textarea cols="75" rows="15" [(ngModel)]="md" (keyup)="convertToHtml();"></textarea>'
})

export class MarkdownComponent implements OnInit {

    md: string = '# Hello, Markdown Editor!';

    constructor(private markdownItService: MarkdownItService) { }

    ngOnInit() { }


    convertToHtml(): string {
        return this.markdownItService.render(this.md);
    }
}