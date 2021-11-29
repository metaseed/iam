import { Component, ElementRef, Inject, Input, ViewChild } from "@angular/core";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { DataSourceLines } from "../data-source-lines";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { debounceTime, Observable, of, shareReplay, Subject, tap } from "rxjs";
import { DocumentStore } from "app/modules/shared/store/document.store";
import { DocEditorService } from "app/modules/shared/doc-editor.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MSG_DISPLAY_TIMEOUT, Tag } from "core";
import { TagsCloudService } from "app/modules/home/tags-cloud/tags-cloud.service";
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { TagsCloudComponent } from "app/modules/home/tags-cloud/tags-cloud.component";
@Component({
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  selector: 'i-tag',
})
export class TagsComponent extends DataSourceLines {
  selectable = false;
  removable = true;
  addOnBlur = false;
  tagList: Tag[];
  tagInputFormControl = new FormControl()
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  private _modifyTags = new Subject<Tag[]>();

  allRepoTags: Tag[];
  _filteredRepoTags: Tag[] = [];
  get filteredRepoTags() {
    return this._filteredRepoTags;
  }
  set filteredRepoTags(v) {
    this._filteredRepoTags = v?.filter(t => !this.tagList.some(tag => tag.name === t.name)) ?? []
  }

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoCompleteTrigger') autoPanel: MatAutocompleteTrigger;

  @Input() set tags(value: string) {
    this.tagList = [];
    value.split(',').map(tag => tag.trim()).filter(t => t !== '').forEach(
      name => this.store.tags.getById(name).then(t => {
        if (t) this.tagList.push(t);
      })
    );
  }

  constructor(private store: DocumentStore,
    private dialog: MatDialog,
    docEditor: DocEditorService,
    private snackBar: MatSnackBar,
    private tagService: TagsCloudService) {
    super(store, docEditor);

    this._modifyTags.pipe(
      debounceTime(1800),
      tap(tags => this.source = `tag: [${tags.filter(t => t).map(t => t.name).join(',')}]`)
    ).subscribe();

    this.tagInputFormControl.valueChanges.pipe(
      tap(value => {
        // when value is finally selected the value is type of Tag.
        if (!value || typeof value !== 'string') return;

        const v = value.toLocaleLowerCase();
        if (this.allRepoTags)
          this.filteredRepoTags = this.allRepoTags.filter(tag => tag.name.toLocaleLowerCase().includes(v))
      }),
      debounceTime(1000),
      tap(value => {
        if (this._filteredRepoTags.length === 0)
          this.snackBar.open(`can not find tag: ${value}`, 'ok')
      })).subscribe()

  }

  onShowTagsCloud() {
    this.dialog.open(TagsCloudComponent);
  }

  remove(tag: Tag): void {
    const index = this.tagList.findIndex(t => t.name === tag.name);

    if (index >= 0) {
      this.tagList.splice(index, 1);
      this._modifyTags.next(this.tagList);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tagList, event.previousIndex, event.currentIndex);
    this._modifyTags.next(this.tagList);
  }

  displayFn(tag: Tag): string {
    return tag && tag.name ? tag.name : '';
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue.trim();
    if (this.tagList.some(t => t.name === value)) {
      this.filteredRepoTags = this.allRepoTags;
      this.autoPanel.openPanel();
      this.snackBar.open(`tag ${value} already exist.`, 'ok')
    } else {
      this.store.tags.getById(value).then(tag => {
        if (tag) {
          this.tagList.push(tag);
          this._modifyTags.next(this.tagList);
        }
      });
    }

    // to make the following ui-invoking of onInputEnd() call's value = '';
    this.tagInput.nativeElement.value = '';
    this.tagInputFormControl.setValue(null);
  }

  /**
  * triggered when user input and hit enter.
  */
   onInputEnd(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      if (!this.allRepoTags.some(v => v.name === value)) {
        this.snackBar.open(`tag ${value} does not exist, please select from tags list`, 'ok')
        this.tagInput.nativeElement.value = '';
        this.filteredRepoTags = this.allRepoTags;
        this.autoPanel.openPanel();
        return;
      }
    }

  }

  onTagInputFocus() {
    if (this.tagInputFormControl.pristine) {
      this.tagService.getAllTags().subscribe(tags => {
        this.allRepoTags = tags;
        this.filteredRepoTags = tags;
        this.autoPanel.openPanel();
      });

    }
  }
}
