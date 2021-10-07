import { Component, Input } from "@angular/core";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { DataSourceLines } from "../data-source-lines";
import { State, Store } from "@ngrx/store";
import { Router } from "@angular/router";

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

  @Input() set tags(value: string) {
    this.tagList = value.split(',');
  }
  constructor(private router: Router, private store: Store<any>, private state: State<any>) {
    super(store, state);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tagList.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tagList.indexOf(tag);

    if (index >= 0) {
      this.tagList.splice(index, 1);
    }
  }
}
