import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { DialogData, MessageDialog } from 'shared';
import { Tag, TagsCloudService } from './tags-cloud.service';

// https://dev.to/alvaromontoro/create-a-tag-cloud-with-html-and-css-1e90

type BackupTag = Tag & { nameOriginal?: string; descriptionOriginal?: string; colorOriginal?: string }

@Component({
  selector: 'tags-cloud',
  templateUrl: './tags-cloud.component.html',
  styleUrls: ['./tags-cloud.component.scss'],
  providers: [TagsCloudService]
})

export class TagsCloudComponent implements OnInit {
  tags: BackupTag[] = [];
  selectedTag: BackupTag & { id?: string } = { name: undefined }
  constructor(private service: TagsCloudService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.service.getAllTags().subscribe(tags => {
      this.tags = tags;
      tags.forEach((t: BackupTag) => {
        t.nameOriginal = t.name;
        t.descriptionOriginal = t.description;
        t.colorOriginal = t.color;
      })
    });

  }

  ngOnInit() { }
  newColor() {
    this.selectedTag.color = Math.floor(Math.random() * 16777215/*0xffffff */).toString(16).padStart(6, '0');
  }
  delete(tag: Tag) {
    const dialogData: DialogData = { title: 'Delete?', message: `are you want to delete tag: '${tag.name}'?\nATTENTION: the tag would be removed from all documents that has this tag.`, defaultAction: 'Ok', additionalAction: 'Cancel' }

    this.dialog
      .open(MessageDialog, { width: '300px', data: dialogData })
      .afterClosed()
      .pipe(
        switchMap(value => {
          if (value === 'Ok') {
            return this.service.deleteTag(tag.name).pipe(tap(() => {
              this.tags = this.tags.filter(t => t.name !== tag.name)
              this.selectedTag = { name: undefined };
              this.snackBar.open(`tag: ${tag.name} deleted!`, 'ok')
            }));
          }
          return EMPTY;
        })
      ).subscribe();
  }
  selectedTagChanged() {
    if(this.selectedTag.description === '') this.selectedTag.description = null;
    return this.selectedTag.name !== this.selectedTag.nameOriginal || this.selectedTag.description !== this.selectedTag.descriptionOriginal || this.selectedTag.color !== this.selectedTag.colorOriginal;
  }
  apply(tag: BackupTag) {
    // success
    tag.nameOriginal = tag.name;
  }
  canAdd(tag: BackupTag) {
    return this.selectedTag.name && (
      !this.selectedTag.id && !this.tags.some(t => t.name === tag.name) ||
      this.selectedTag.id && this.selectedTag.name !== this.selectedTag.nameOriginal
    );
  }
}

