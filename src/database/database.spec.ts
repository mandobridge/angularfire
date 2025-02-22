import { TestBed } from '@angular/core/testing';
import {
  FirebaseApp,
  provideFirebaseApp,
  getApp,
  initializeApp,
  deleteApp,
} from '@mandobridge/angularfire/app';
import {
  Database,
  provideDatabase,
  getDatabase,
  connectDatabaseEmulator,
  goOffline,
} from '@mandobridge/angularfire/database';
import { COMMON_CONFIG } from '../test-config';
import { rando } from '../utils';

describe('Database', () => {
  let app: FirebaseApp;
  let database: Database;
  let providedDatabase: Database;
  let appName: string;

  describe('single injection', () => {
    beforeEach(() => {
      appName = rando();
      TestBed.configureTestingModule({
        imports: [
          provideFirebaseApp(() => initializeApp(COMMON_CONFIG, appName)),
          provideDatabase(() => {
            providedDatabase = getDatabase(getApp(appName));
            connectDatabaseEmulator(providedDatabase, 'localhost', 9000);
            return providedDatabase;
          }),
        ],
      });
      app = TestBed.inject(FirebaseApp);
      database = TestBed.inject(Database);
    });

    afterEach(() => {
      goOffline(database);
    });

    it('should be injectable', () => {
      expect(providedDatabase).toBeTruthy();
      expect(database).toEqual(providedDatabase);
      expect(database.app).toEqual(app);
    });
  });
});
