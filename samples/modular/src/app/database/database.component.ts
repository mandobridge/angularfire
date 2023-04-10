import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { traceUntilFirst } from '@mandobridge/angularfire/performance';
import { Database, objectVal, ref } from '@mandobridge/angularfire/database';

@Component({
  selector: 'app-database',
  template: `
    <p>
      Database!
      <code>{{ testObjectValue$ | async | json }}</code>
    </p>
  `,
  styles: [],
})
export class DatabaseComponent implements OnInit {
  public readonly testObjectValue$: Observable<any>;

  constructor(database: Database) {
    const doc = ref(database, 'test');
    this.testObjectValue$ = objectVal(doc).pipe(traceUntilFirst('database'));
  }

  ngOnInit(): void {}
}
