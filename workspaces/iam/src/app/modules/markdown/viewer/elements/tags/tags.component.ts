import { Component, Inject, Input } from "@angular/core";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { DataSourceLines } from "../data-source-lines";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { debounceTime, Subject, tap } from "rxjs";
import { DocumentStore } from "app/modules/shared/store/document.store";
import { DocEditorService } from "app/modules/shared/doc-editor.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MSG_DISPLAY_TIMEOUT } from "core";
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
  private modifyTags = new Subject<string[]>();

  @Input() set tags(value: string) {
    this.tagList = value.split(',').map(tag => tag.trim()).filter(t => t !== '');
  }

  constructor(store: DocumentStore, docEditor: DocEditorService, private snackBar: MatSnackBar) {
    super(store, docEditor);
    this.modifyTags.pipe(
      debounceTime(1800),
      tap(tags => this.source = `tag: [${tags.join(',')}]`)
    ).subscribe();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      if(this.tagList.includes(value)){
        this.snackBar.open(`tag ${value} already exist.`, 'ok', { duration: MSG_DISPLAY_TIMEOUT })
        return;
      }
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
