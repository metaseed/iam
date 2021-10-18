import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownComponent } from './markdown.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { MarkdownViewerModule } from './viewer';
import { MarkdownRoutingModule } from './markdown-routing.module';
import { SpinnerModule } from '@metaseed/spinner';
import { SharedModule } from 'shared';
import { EffectsModule } from '@ngrx/effects';
import { MarkdownEffects } from './markdown.effects';
import { MarkdownStore } from './markdown-container.store';
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
    EffectsModule.forFeature([MarkdownEffects])
  ],
  declarations: [MarkdownComponent],
  providers: [
    MarkdownStore,
    { provide: MARKDOWN_STORE_TOKEN, useExisting: MarkdownStore }
  ],
  exports: [MarkdownViewerModule, MarkdownComponent]
})
export class MarkdownModule { }
