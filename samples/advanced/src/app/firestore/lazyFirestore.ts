import { docData, doc } from '@mandobridge/angularfire/firestore';
import { firestore, persistenceEnabled } from '../getFirestore';

const ref = doc(firestore, 'test/1');

export const valueChanges = docData(ref);

export { persistenceEnabled };
