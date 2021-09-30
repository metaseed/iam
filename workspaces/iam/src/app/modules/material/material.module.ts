import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';

export const MatModules = [
  MatProgressSpinnerModule,
  MatIconModule,
  MatMenuModule,
  MatTabsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatDialogModule,
  MatIconModule,
  MatTreeModule,
  MatSidenavModule,
  MatInputModule,
];

@NgModule({
  imports: [...MatModules],
  exports: [...MatModules],
  providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 8000 } }]
})
export class MaterialModule { }
