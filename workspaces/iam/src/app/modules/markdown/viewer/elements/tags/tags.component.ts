import { Component, Input } from "@angular/core";

@Component({
  templateUrl: './tags.component.html',
  styleUrls:['./tags.component.scss'],
  selector: 'i-tags',
})
export class TagsComponent {
  selectable = false;

  @Input()tags
}
