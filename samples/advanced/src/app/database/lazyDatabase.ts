import { getDatabase, ref, objectVal } from '@mandobridge/angularfire/database';
import { connectDatabaseEmulatorInDevMode } from '../emulators';

const database = getDatabase();
connectDatabaseEmulatorInDevMode(database);

const doc = ref(database, 'test');
export const valueChanges = objectVal(doc);
