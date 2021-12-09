import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Issue } from 'app/modules/net-storage/github';
import { DocumentStore } from 'app/modules/shared/store/document.store';
import { DocMeta, issueToDocMeta, Tag } from 'core';
import { EMPTY } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { DialogData, MessageDialog } from 'shared';
import { TagsCloudService } from './tags-cloud.service';

// https://dev.to/alvaromontoro/create-a-tag-cloud-with-html-and-css-1e90

type BackupTag = Tag & { id?: string, nameOriginal?: string; descriptionOriginal?: string; colorOriginal?: string }

@Component({
  selector: 'tags-cloud',
  templateUrl: './tags-cloud.component.html',
  styleUrls: ['./tags-cloud.component.scss'],
})

export class TagsCloudComponent {
  tags: BackupTag[] = [];
  selectedTag: BackupTag & { id?: string } = { name: undefined }
  constructor(private service: TagsCloudService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<TagsCloudComponent>,
    private store: DocumentStore) {

    store.tags.values$.subscribe(tags => {
      this.tags = tags;
      tags.forEach((t: BackupTag) => {
        this.backupOriginalProperties(t);
      })
    })
    this.service.getAllTags.next(undefined);
  }

  newColor() {
    this.selectedTag.color = Math.floor(Math.random() * 16777215/*0xffffff */).toString(16).padStart(6, '0');
  }
  delete(tag: Tag) {
    const dialogData: DialogData = { title: 'Delete?', message: `Are you want to delete tag: '${tag.name}'?\n \n ATTENTION: the tag would be removed from all documents that has this tag.`, defaultAction: 'Ok', additionalAction: 'Cancel' }

    this.dialog
      .open(MessageDialog, { width: '40rem', height: '30rem', data: dialogData })
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

  canApply(tag: BackupTag) {
    const selectedTag = this.selectedTag;
    return !!(
      selectedTag.id &&
      selectedTag.name &&
      this.selectedTagModified(selectedTag))
  }

  apply(tag: BackupTag) {
    this.service.updateTag(tag.nameOriginal, tag).subscribe(
      (t: Tag) => {
        this.store.tags.update({ id: tag.nameOriginal, changes: t })
      }
    );

  }

  selectedTagDocs: DocMeta[];
  select(tag: Tag) {
    this.selectedTag = tag;
    this.service.listDocuments(tag).subscribe(issues => {
      this.selectedTagDocs = (issues as Issue[]).map(i => issueToDocMeta(i, this.store.tags))
    })
  }

  canAdd(tag: BackupTag) {
    return this.selectedTag.name && (
      this.selectedTag.id && this.selectedTag.name !== this.selectedTag.nameOriginal ||
      !this.selectedTag.id && tag.name && !this.tags.some(t => t.name === tag.name)
    );
  }

  addTag(tag: BackupTag) {
    this.service.addTag(tag).pipe(
      tap((t: Tag) => {
        this.restoreOriginalProperties(tag);
        this.backupOriginalProperties(t);
        this.store.tags.upsert(t);
        this.snackBar.open(`tag:${t.name} added!`, 'ok');
      }),
      catchError(err => {
        this.snackBar.open(`error while adding tag: ${err?.error?.errors?.[0]?.code ?? ''}`);
        return EMPTY;
      })
    ).subscribe();
  }

  private selectedTagModified(tag: BackupTag) {
    if (tag.description === '' && tag.descriptionOriginal === null) return false;
    return tag.name !== tag.nameOriginal || tag.description !== tag.descriptionOriginal || tag.color !== tag.colorOriginal;
  }

  onOpen(tag: Tag) {
    this.close();
  }

  close() {
    this.dialogRef.close();

  }
  private backupOriginalProperties(t: BackupTag) {
    t.nameOriginal = t.name;
    t.descriptionOriginal = t.description;
    t.colorOriginal = t.color;
  }
  private restoreOriginalProperties(t: BackupTag) {
    t.name = t.nameOriginal;
    t.description = t.descriptionOriginal;
    t.color = t.colorOriginal;
  }
}

