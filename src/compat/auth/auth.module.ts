import { NgModule } from '@angular/core';
import { AngularFireAuth } from './auth';
import firebase from 'firebase/compat/app';
import { VERSION } from '@mandobridge/angularfire';

@NgModule({
  providers: [AngularFireAuth],
})
export class AngularFireAuthModule {
  constructor() {
    firebase.registerVersion('angularfire', VERSION.full, 'auth-compat');
  }
}
