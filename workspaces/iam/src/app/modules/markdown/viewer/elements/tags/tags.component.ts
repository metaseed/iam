import { Component, ElementRef, Inject, Input, ViewChild } from "@angular/core";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { DataSourceLines } from "../data-source-lines";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { debounceTime, Observable, of, shareReplay, Subject, tap } from "rxjs";
import { DocumentStore } from "app/modules/shared/store/document.store";
import { DocEditorService } from "app/modules/shared/doc-editor.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MSG_DISPLAY_TIMEOUT } from "core";
import { Tag, TagsCloudService } from "app/modules/home/tags-cloud/tags-cloud.service";
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { FormControl } from "@angular/forms";
@Component({
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  selector: 'i-tag',
})
export class TagsComponent extends DataSourceLines {
  selectable = false;
  removable = true;
  addOnBlur = false;
  tagList: string[];
  tagInputFormControl = new FormControl()
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  private modifyTags = new Subject<string[]>();

  allRepoTags: Tag[];
  filteredRepoTags: Tag[] = [];
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoCompleteTrigger') autoPanel: MatAutocompleteTrigger;
  @Input() set tags(value: string) {
    this.tagList = value.split(',').map(tag => tag.trim()).filter(t => t !== '');
  }

  constructor(store: DocumentStore,
    docEditor: DocEditorService,
    private snackBar: MatSnackBar,
    private tagService: TagsCloudService) {
    super(store, docEditor);

    this.modifyTags.pipe(
      debounceTime(1800),
      tap(tags => this.source = `tag: [${tags.join(',')}]`)
    ).subscribe();

    this.tagInputFormControl.valueChanges.pipe(tap(value => {
      // when value is finally selected the value is type of Tag.
      if (!value || typeof value !== 'string') return;

      const v = value.toLocaleLowerCase();
      this.filteredRepoTags = this.allRepoTags.filter(tag => tag.name.toLocaleLowerCase().includes(v))
    })).subscribe()

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

  displayFn(tag: Tag): string {
    return tag && tag.name ? tag.name : '';
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    if (this.tagList.includes(value)) {
      this.snackBar.open(`tag ${value} already exist.`, 'ok', { duration: MSG_DISPLAY_TIMEOUT })
    } else {
      this.tagList.push(value);
      this.modifyTags.next(this.tagList);
    }

    // the following add() call's value = '';
    this.tagInput.nativeElement.value = '';
    this.tagInputFormControl.setValue(null);
  }

 /**
 * triggered when user input and hit enter.
 */
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      if (!this.allRepoTags.some(v => v.name === value)) {
        this.snackBar.open(`tag ${value} does not exist, please select from tags list`, 'ok', { duration: MSG_DISPLAY_TIMEOUT })
        this.tagInput.nativeElement.value = '';
        this.filteredRepoTags = this.allRepoTags;
        this.autoPanel.openPanel();
        return;
      }
    }

  }

  tagInputFocus() {
    if (!this.allRepoTags) {
      this.tagService.getAllTags().subscribe(tags => {
        this.allRepoTags = tags;
        this.filteredRepoTags = tags;
        this.autoPanel.openPanel();
      });

    }
  }
}
