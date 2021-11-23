import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { DialogModalComponent } from '../dialog-modal/dialog-modal.component';

import { MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
//import {CdkTableModule} from '@angular/cdk/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule }from '@angular/material/menu';
import { MatDatepickerModule }from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddProjectComponent } from '@app/add-project/add-project.component';
import { AddMemberModalComponent } from '@app/dashboard/members/add-member-modal/add-member-modal.component';
import { FilterPipe } from '@app/dashboard/filter.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
//import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [AddProjectComponent, AddMemberModalComponent, DialogModalComponent, FilterPipe
  ],
  imports: [

        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatInputModule,
        MatCardModule,
        MatDialogModule,
        MatChipsModule,
        MatStepperModule,
        MatSlideToggleModule,
        MatProgressBarModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatExpansionModule,
        MatSelectModule,
        MatSliderModule,
        MatCheckboxModule,
        MatBadgeModule,
        MatTooltipModule,
        MatMenuModule,
        MatDatepickerModule,
        MatNativeDateModule,
        DragDropModule,

        //CdkTableModule,
    ],
  exports: [
      ReactiveFormsModule,
      FormsModule,
      CommonModule,
      HttpClientModule,
      MatToolbarModule,
      MatSidenavModule,
      MatListModule,
      MatButtonModule,
      MatIconModule,
      MatAutocompleteModule,
      MatInputModule,
      MatCardModule,
      MatDialogModule,
      MatProgressBarModule,
      MatTableModule,
      DialogModalComponent,
      AddMemberModalComponent,
      MatFormFieldModule,
      MatPaginatorModule,
      MatExpansionModule,
      MatSelectModule,
      MatBadgeModule,
      MatMenuModule,
      MatDatepickerModule,
      MatNativeDateModule,
    MatCheckboxModule,
    DragDropModule,
      //CdkTableModule,

      FilterPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MatDialog, ]

})
export class CoreModule { }
