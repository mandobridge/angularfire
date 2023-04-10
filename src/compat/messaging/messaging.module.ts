import { NgModule } from '@angular/core';
import { AngularFireMessaging } from './messaging';
import firebase from 'firebase/compat/app';
import { VERSION } from '@mandobridge/angularfire';

@NgModule({
  providers: [AngularFireMessaging],
})
export class AngularFireMessagingModule {
  constructor() {
    firebase.registerVersion('angularfire', VERSION.full, 'fcm-compat');
  }
}
