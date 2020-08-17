import { Component, OnInit, Inject, Input } from '@angular/core';
import { TableDataService } from '../table-data.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

interface IRecord<T> {
  id: string;
  name: string;
  surname: string;
  languages: T;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  dataList;
  dataSource;
  headers: string[];
  headerToKey;
  hasData: boolean;

  constructor(
    private tableDataService: TableDataService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.hasData = false;
  }

  ngOnInit(): void {
    [
      this.dataList,
      this.headers,
      this.headerToKey,
    ] = this.tableDataService.getItems();
    this.dataSource = new MatTableDataSource(this.dataList);
    if (!this.headers.includes('_control_')) this.headers.push('_control_');
    if (this.dataList.length > 0) this.hasData = true;
  }
  onNewTableBtnClick() {
    this.router.navigate(['/']);
  }

  delRecord(id) {
    this.dataSource.data = this.tableDataService.delItem(id);
  }

  onListDrop(e) {
    this.dataSource.data = this.tableDataService.moveItem(
      e.previousIndex,
      e.currentIndex
    );
  }

  openDialog(record): void {
    const dialogRef = this.dialog.open(TableDialogComponent, {
      width: '40rem',
      data: { ...record, languages: record.languages.join(',') },
    });

    dialogRef.afterClosed().subscribe((result) => {
      const data = {
        ...result,
        languages: result.languages.split(',').map((el) => el.trim()),
      };
      this.dataSource.data = this.tableDataService.setItem(data);
    });
  }
}

@Component({
  selector: 'app-table-dialog',
  templateUrl: 'table-dialog.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSaveClick(): void {
    this.dialogRef.close();
  }
}
