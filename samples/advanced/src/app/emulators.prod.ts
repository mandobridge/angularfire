import { Auth } from '@mandobridge/angularfire/auth';
import { Database } from '@mandobridge/angularfire/database';
import { Firestore } from '@mandobridge/angularfire/firestore';
import { Functions } from '@mandobridge/angularfire/functions';
import { Storage } from '@mandobridge/angularfire/storage';

export const connectAuthEmulatorInDevMode = (_: Auth) => {};
export const connectFirestoreEmulatorInDevMode = (_: Firestore) => {};
export const connectStorageEmulatorInDevMode = (_: Storage) => {};
export const connectFunctionsEmulatorInDevMode = (_: Functions) => {};
export const connectDatabaseEmulatorInDevMode = (_: Database) => {};
