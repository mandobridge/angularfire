import { NgModule } from '@angular/core';
import { GetDownloadURLPipeModule } from './pipes/storageUrl.pipe';
import { AngularFireStorage } from './storage';
import firebase from 'firebase/compat/app';
import { VERSION } from '@mandobridge/angularfire';

@NgModule({
  exports: [GetDownloadURLPipeModule],
  providers: [AngularFireStorage],
})
export class AngularFireStorageModule {
  constructor() {
    firebase.registerVersion('angularfire', VERSION.full, 'gcs-compat');
  }
}
