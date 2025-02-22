import { NgModule } from '@angular/core';
import { AngularFireRemoteConfig } from './remote-config';
import firebase from 'firebase/compat/app';
import { VERSION } from '@mandobridge/angularfire';

@NgModule({
  providers: [AngularFireRemoteConfig],
})
export class AngularFireRemoteConfigModule {
  constructor() {
    firebase.registerVersion('angularfire', VERSION.full, 'rc-compat');
  }
}
