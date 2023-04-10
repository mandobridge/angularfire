import { Component, OnInit } from '@angular/core';
import { getToken, AppCheck } from '@mandobridge/angularfire/app-check';
import { traceUntilFirst } from '@mandobridge/angularfire/performance';
import { EMPTY, from, Observable } from 'rxjs';
import { keepUnstableUntilFirst } from '@mandobridge/angularfire';
import { share } from 'rxjs/operators';

@Component({
  selector: 'app-app-check',
  template: `
    <p>
      App Check!
      <code
        >{{ (change$ | async)?.token | slice : 0 : 12
        }}<ng-container *ngIf="(change$ | async) !== null"
          >&hellip;</ng-container
        ></code
      >
    </p>
  `,
  styles: [],
})
export class AppCheckComponent implements OnInit {
  readonly change$: Observable<any>;

  constructor(appCheck: AppCheck) {
    if (appCheck) {
      this.change$ = from(getToken(appCheck)).pipe(
        traceUntilFirst('app-check'),
        keepUnstableUntilFirst,
        share()
      );
    } else {
      this.change$ = EMPTY;
    }
  }

  ngOnInit(): void {}
}
