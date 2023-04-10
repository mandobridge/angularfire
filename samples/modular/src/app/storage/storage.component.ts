import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { TransferState } from '@angular/platform-browser';
import { traceUntilFirst } from '@mandobridge/angularfire/performance';
import { getDownloadURL, ref, Storage } from '@mandobridge/angularfire/storage';
import { keepUnstableUntilFirst } from '@mandobridge/angularfire';

const TRANSPARENT_PNG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

@Component({
  selector: 'app-storage',
  template: `
    <p>
      Storage!
      <img [src]="downloadUrl$ | async" width="64" height="64" />
    </p>
  `,
  styles: [],
})
export class StorageComponent implements OnInit {
  public readonly downloadUrl$: Observable<string>;

  constructor(storage: Storage) {
    const icon = ref(storage, 'google-g.png');
    this.downloadUrl$ = from(getDownloadURL(icon)).pipe(
      keepUnstableUntilFirst,
      traceUntilFirst('storage'),
      startWith(TRANSPARENT_PNG)
    );
  }

  ngOnInit(): void {}
}
