import {
  ref,
  getStorage,
  getDownloadURL,
} from '@mandobridge/angularfire/storage';
import { connectStorageEmulatorInDevMode } from '../emulators';

export const storage = getStorage();
connectStorageEmulatorInDevMode(storage);

const icon = ref(storage, 'google-g.png');

export const iconUrl = getDownloadURL(icon);
