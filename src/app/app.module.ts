import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableDataService } from './table-data.service';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatInputModule} from '@angular/material/input';
import { FormsModule }   from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { FileLoaderComponent } from './file-loader/file-loader.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { TableComponent, TableDialogComponent } from './table/table.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    FileLoaderComponent,
    TableComponent,
    TableDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule, 
    MatDialogModule,
    MatIconModule,
    DragDropModule,
    MaterialFileInputModule,
    MatGridListModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    MatChipsModule,
    RouterModule.forRoot([
      { path: '', component: FileLoaderComponent },
      { path: 'table', component: TableComponent },
    ])
  ],
  entryComponents: [TableComponent, TableDialogComponent],
  providers: [TableDataService, { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },],
  bootstrap: [AppComponent]
})
export class AppModule { }
