import { TestBed } from '@angular/core/testing';
import {
  AngularFireModule,
  FirebaseApp,
} from '@mandobridge/angularfire/compat';
import {
  AngularFirePerformance,
  AngularFirePerformanceModule,
} from '@mandobridge/angularfire/compat/performance';
import { COMMON_CONFIG } from '../../test-config';
import { rando } from '../../utils';

describe('AngularFirePerformance', () => {
  let app: FirebaseApp;
  let afp: AngularFirePerformance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG, rando()),
        AngularFirePerformanceModule,
      ],
    });

    app = TestBed.inject(FirebaseApp);
    afp = TestBed.inject(AngularFirePerformance);
  });

  it('should exist', () => {
    expect(afp instanceof AngularFirePerformance).toBe(true);
  });

  it('should have the Performance instance', () => {
    expect(afp.dataCollectionEnabled).toBeDefined();
  });
});
