import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from '@angular/material/card';
import { DialogModalComponent } from '../dialog-modal/dialog-modal.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";



@NgModule({
  declarations: [DialogModalComponent],
  imports: [
      ReactiveFormsModule,
      FormsModule,
      CommonModule,
      MatToolbarModule,
      MatSidenavModule,
      MatListModule,
      MatButtonModule,
      MatIconModule,
      MatButtonModule,
      MatAutocompleteModule,
      MatInputModule,
      MatCardModule,
      MatDialogModule
  ],
  exports: [
      ReactiveFormsModule,
      FormsModule,
      CommonModule,
      MatToolbarModule,
      MatSidenavModule,
      MatListModule,
      MatButtonModule,
      MatIconModule,
      MatAutocompleteModule,
      MatInputModule,
      MatCardModule,
      MatDialogModule,
      DialogModalComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MatDialog]

})
export class CoreModule { }
