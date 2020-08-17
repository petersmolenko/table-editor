import { Injectable } from '@angular/core';

interface IRecord<T> {
  id: string;
  name: string;
  surname: string;
  languages: T;
}

@Injectable({
  providedIn: 'root',
})
export class TableDataService {
  items: IRecord<string[]>[] = [];
  headers: string[] = [];
  headerToKey = null;

  getItems() {
    return [this.items, this.headers, this.headerToKey];
  }

  setItems(data: IRecord<string>[], headers: string[], headerToKey: any) {
    this.items = data.map<IRecord<string[]>>((el) => ({
      ...el,
      languages: el.languages.split(','),
    }));
    this.headers = headers;
    this.headerToKey = headerToKey;
  }

  setItem(record: IRecord<string[]>) {
    record = JSON.parse(JSON.stringify(record));
    const changedEl = this.items.findIndex((el) => el.id === record.id);
    console.log(!!changedEl);
    this.items[changedEl !== -1 ? changedEl : this.items.length] = record;
    return this.items;
  }

  delItem(id: string) {
    const changedEl = this.items.findIndex((el) => el.id === id);
    this.items.splice(changedEl, 1);
    return this.items;
  }
  moveItem(prevIndex: number, nextIndex: number) {
    const [el] = this.items.splice(prevIndex, 1);
    this.items.splice(nextIndex, 0, el);
    return this.items;
  }
}
