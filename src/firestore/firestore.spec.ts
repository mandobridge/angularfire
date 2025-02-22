import { TestBed } from '@angular/core/testing';
import {
  FirebaseApp,
  provideFirebaseApp,
  getApp,
  initializeApp,
  deleteApp,
} from '@mandobridge/angularfire/app';
import {
  Firestore,
  provideFirestore,
  getFirestore,
  connectFirestoreEmulator,
  disableNetwork,
} from '@mandobridge/angularfire/firestore';
import { COMMON_CONFIG } from '../test-config';
import { rando } from '../utils';

describe('Firestore', () => {
  let app: FirebaseApp;
  let firestore: Firestore;
  let providedFirestore: Firestore;
  let appName: string;

  describe('single injection', () => {
    beforeEach(() => {
      appName = rando();
      TestBed.configureTestingModule({
        imports: [
          provideFirebaseApp(() => initializeApp(COMMON_CONFIG, appName)),
          provideFirestore(() => {
            providedFirestore = getFirestore(getApp(appName));
            connectFirestoreEmulator(providedFirestore, 'localhost', 8080);
            return providedFirestore;
          }),
        ],
      });
      app = TestBed.inject(FirebaseApp);
      firestore = TestBed.inject(Firestore);
    });

    afterEach(() => {
      disableNetwork(firestore);
    });

    it('should be injectable', () => {
      expect(providedFirestore).toBeTruthy();
      expect(firestore).toEqual(providedFirestore);
      expect(firestore.app).toEqual(app);
    });
  });
});
