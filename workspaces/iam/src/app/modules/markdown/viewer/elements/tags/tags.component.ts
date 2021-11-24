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

  allTags: Tag[];
  filteredOptions: Tag[] = [];
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoCompleteTrigger') autoPanel: MatAutocompleteTrigger;
  @Input() set tags(value: string) {
    this.tagList = value.split(',').map(tag => tag.trim()).filter(t => t !== '');
  }

  constructor(store: DocumentStore, docEditor: DocEditorService, private snackBar: MatSnackBar,
    private tagService: TagsCloudService) {
    super(store, docEditor);
    this.modifyTags.pipe(
      debounceTime(1800),
      tap(tags => this.source = `tag: [${tags.join(',')}]`)
    ).subscribe();

    this.tagInputFormControl.valueChanges.subscribe(value => {
      if(!v) return;

      const v = value.toLocaleLowerCase();
      this.filteredOptions =this.allTags.filter(tag => tag.name.toLocaleLowerCase().includes(v))
    })

  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (this.filteredOptions.length !== 1) {
      this.snackBar.open(`tag ${value} does not exist, please select from tags list`, 'ok', { duration: MSG_DISPLAY_TIMEOUT })
      this.tagInput.nativeElement.value = '';
      this.filteredOptions = this.allTags;
      this.autoPanel.openPanel();
      return;
    }

    if (value) {
      if (this.tagList.includes(value)) {
        this.snackBar.open(`tag ${value} already exist.`, 'ok', { duration: MSG_DISPLAY_TIMEOUT })
        return;
      }
      this.tagList.push(value);
      this.modifyTags.next(this.tagList);
    }

    event.chipInput!.clear();
    this.filteredOptions = [];
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
    this.tagList.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagInputFormControl.setValue(null);
  }
  tagInputFocus() {
    if (!this.allTags) {
      this.tagService.getAllTags().subscribe(tags => {
        this.allTags = tags;
        this.filteredOptions = tags;
        this.autoPanel.openPanel();
      });

    }
  }
}
