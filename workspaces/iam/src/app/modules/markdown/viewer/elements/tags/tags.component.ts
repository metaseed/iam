import { Component, Input } from "@angular/core";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { DataSourceLines } from "../data-source-lines";
import { State, Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { debounceTime, Subject, tap } from "rxjs";
@Component({
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  selector: 'i-tag',
})
export class TagsComponent extends DataSourceLines {
  selectable = false;
  removable = true;
  addOnBlur = true;
  tagList: string[];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  private modifyTags = new Subject();

  @Input() set tags(value: string) {
    this.tagList = value.split(',').map(tag=>tag.trim());
  }
  constructor(private router: Router, private store: Store<any>, private state: State<any>) {
    super(store, state);
    this.modifyTags.pipe(
      debounceTime(2000),
      // tap(tags => {
      //   this.source = `tag: [${tags}]`;
      // })
    ).subscribe();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tagList.push(value);
      this.modifyTags.next(this.tagList);
    }

    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tagList.indexOf(tag);

    if (index >= 0) {
      this.tagList.splice(index, 1);
      this.modifyTags.next(this.tagList);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tagList, event.previousIndex, event.currentIndex);
    this.modifyTags.next(this.tagList);
  }
}
