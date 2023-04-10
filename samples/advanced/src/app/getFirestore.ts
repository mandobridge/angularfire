import {
  getFirestore,
  enableMultiTabIndexedDbPersistence,
} from '@mandobridge/angularfire/firestore';
import { connectFirestoreEmulatorInDevMode } from './emulators';

export const firestore = getFirestore();
connectFirestoreEmulatorInDevMode(firestore);

const isNode = () =>
  !!(typeof process !== 'undefined' && process.versions?.node);

export const persistenceEnabled = isNode()
  ? Promise.resolve(false)
  : enableMultiTabIndexedDbPersistence(firestore).then(
      () => true,
      () => false
    );
