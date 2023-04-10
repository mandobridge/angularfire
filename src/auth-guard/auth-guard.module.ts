import { NgModule } from '@angular/core';
import { AuthGuard } from './auth-guard';
import { registerVersion } from 'firebase/app';
import { VERSION } from '@mandobridge/angularfire';

@NgModule({
  providers: [AuthGuard],
})
export class AuthGuardModule {
  constructor() {
    registerVersion('angularfire', VERSION.full, 'auth-guard');
  }
}
