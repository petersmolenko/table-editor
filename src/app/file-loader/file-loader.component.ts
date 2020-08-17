import { Component, OnInit } from '@angular/core';
import * as Papa from 'papaparse';
import { TableDataService } from '../table-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: ['./file-loader.component.css'],
})
export class FileLoaderComponent {
  headToName;
  headers;
  data;
  hasData;

  constructor(
    private tableDataService: TableDataService,
    private router: Router
  ) {
    this.hasData = false;
  }

  onChange(files: any) {
    if (files[0]) {
      Papa.parse(files[0], {
        header: true,
        delimiter: ';',
        skipEmptyLines: true,
        complete: (result) => {
          this.headToName = [
            ['Id', 'id'],
            ['Name', 'name'],
            ['Surname', 'surname'],
            ['Preferred programming languages', 'languages'],
          ];
          this.headers = result.meta.fields;
          this.data = result.data.map((item) => {
            return this.headToName.reduce((acc, el) => {
              if (this.headers.includes(el[0])) acc[el[1]] = item[el[0]];
              return acc;
            }, {});
          });
          this.hasData = !!this.data.length;
        },
      });
    }
  }

  onShowBtnClick() {
    this.router.navigate(['/table']);
  }
  onCreateBtnClick() {
    this.tableDataService.setItems(
      this.data,
      this.headers,
      this.headToName.reduce((acc, el) => {
        acc[el[0]] = el[1];
        return acc;
      }, {})
    );

    this.router.navigate(['/table']);
  }
}
