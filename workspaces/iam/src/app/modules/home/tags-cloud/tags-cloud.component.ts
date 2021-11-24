import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Issue } from 'app/modules/net-storage/github';
import { DocMeta, issueToDocMeta, SubscriptionManager } from 'core';
import { EMPTY } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { DialogData, MessageDialog } from 'shared';
import { Tag, TagsCloudService } from './tags-cloud.service';

// https://dev.to/alvaromontoro/create-a-tag-cloud-with-html-and-css-1e90

type BackupTag = Tag & { id?: string, nameOriginal?: string; descriptionOriginal?: string; colorOriginal?: string }

@Component({
  selector: 'tags-cloud',
  templateUrl: './tags-cloud.component.html',
  styleUrls: ['./tags-cloud.component.scss'],
  providers: [TagsCloudService]
})

export class TagsCloudComponent {
  tags: BackupTag[] = [];
  selectedTag: BackupTag & { id?: string } = { name: undefined }
  constructor(private service: TagsCloudService, private dialog: MatDialog, private snackBar: MatSnackBar, private dialogRef: MatDialogRef<TagsCloudComponent>) {
    this.service.getAllTags().subscribe(tags => {
      this.tags = tags;
      tags.forEach((t: BackupTag) => {
        this.backup(t);
      })
    });

  }

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

  apply(tag: BackupTag) {
    this.service.updateTag(tag.nameOriginal, tag).subscribe(
      (t: Tag) => {
        tag.nameOriginal = t.name;
      }
    );

  }
  selectedTagDocs: DocMeta[];
  select(tag: Tag) {
    this.selectedTag = tag;
    this.service.listDocuments(tag).subscribe(issues => {
      this.selectedTagDocs = (issues as Issue[]).map(issueToDocMeta)
    })
  }


  addTag(tag: Tag) {
    this.service.addTag(tag).pipe(
      tap((t: Tag) => {
        this.backup(t);
        this.tags.push(t)
      })
    ).subscribe();
  }

  canAdd(tag: BackupTag) {
    return this.selectedTag.name && (
      this.selectedTag.id && this.selectedTag.name !== this.selectedTag.nameOriginal ||
      !this.selectedTag.id && tag.name && !this.tags.some(t => t.name === tag.name)
    );
  }

  private selectedTagChanged(tag: BackupTag) {
    if (tag.description === ''&& tag.descriptionOriginal === null) return false;
    return tag.name !== tag.nameOriginal || tag.description !== tag.descriptionOriginal || tag.color !== tag.colorOriginal;
  }

  canApply(tag: BackupTag) {
    const selectedTag = this.selectedTag;
    return !!(selectedTag.id && selectedTag.name && this.selectedTagChanged(selectedTag))
  }

  onOpen(tag: Tag) {
    this.close();
  }

  close(){
    this.dialogRef.close();

  }
  private backup(t: BackupTag) {
    t.nameOriginal = t.name;
    t.descriptionOriginal = t.description;
    t.colorOriginal = t.color;
  }
}

