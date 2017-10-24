import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ms-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnInit {
  private markdown: string;
  aceOptions: any = { maxLines: 100000, printMargin: false };
  constructor() { }

  ngOnInit() {
  }
  onAceChange(code) {
    console.log("new code", code);
  }
}
