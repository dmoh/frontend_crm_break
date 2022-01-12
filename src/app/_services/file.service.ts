//import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  public filesHolder$: BehaviorSubject<File[]> = new BehaviorSubject([]);

  constructor() { }

  public addFile(files) {
    this.filesHolder$.next([...this.filesHolder$.value, ...files])
  }
  public removeFile(index) {
    const files = this.filesHolder$.value.slice();
    files.splice(index, 1);
    this.filesHolder$.next(files);
  }
}
