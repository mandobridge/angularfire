import { connectAuthEmulator, Auth } from '@mandobridge/angularfire/auth';
import {
  connectDatabaseEmulator,
  Database,
} from '@mandobridge/angularfire/database';
import {
  connectFirestoreEmulator,
  Firestore,
} from '@mandobridge/angularfire/firestore';
import {
  connectFunctionsEmulator,
  Functions,
} from '@mandobridge/angularfire/functions';
import {
  connectStorageEmulator,
  Storage,
} from '@mandobridge/angularfire/storage';

export const connectAuthEmulatorInDevMode = (auth: Auth) =>
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });

export const connectFirestoreEmulatorInDevMode = (firestore: Firestore) =>
  connectFirestoreEmulator(firestore, 'localhost', 8080);

export const connectStorageEmulatorInDevMode = (storage: Storage) =>
  connectStorageEmulator(storage, 'localhost', 9199);

export const connectFunctionsEmulatorInDevMode = (functions: Functions) =>
  connectFunctionsEmulator(functions, 'localhost', 5001);

export const connectDatabaseEmulatorInDevMode = (database: Database) =>
  connectDatabaseEmulator(database, 'localhost', 9000);
