import { Component, OnInit } from '@angular/core';
import { getToken, AppCheck } from '@mandobridge/angularfire/app-check';
import { traceUntilFirst } from '@mandobridge/angularfire/performance';
import { from, Observable } from 'rxjs';
import { keepUnstableUntilFirst } from '@mandobridge/angularfire';
import { share, tap } from 'rxjs/operators';

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
    this.change$ = from(getToken(appCheck)).pipe(
      keepUnstableUntilFirst,
      traceUntilFirst('app-check'),
      share()
    );
  }

  ngOnInit(): void {}
}
