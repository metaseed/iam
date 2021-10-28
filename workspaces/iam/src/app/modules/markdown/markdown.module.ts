import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownComponent } from './markdown.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { MarkdownViewerModule } from './viewer';
import { MarkdownRoutingModule } from './markdown-routing.module';
import { SpinnerModule } from '@metaseed/spinner';
import { SharedModule } from 'shared';
import { MarkdownEffects } from './store/markdown.effects';
import { MarkdownStore } from './store/markdown.store';
import { MARKDOWN_STORE_TOKEN } from './model/markdown.model';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SpinnerModule,
    MarkdownRoutingModule,
    SharedModule,
    MarkdownViewerModule.forFeature(),
  ],
  declarations: [MarkdownComponent],
  providers: [
    MarkdownEffects,
    MarkdownStore,
    { provide: MARKDOWN_STORE_TOKEN, useExisting: MarkdownStore }
  ],
  exports: [MarkdownViewerModule, MarkdownComponent]
})
export class MarkdownModule { }
