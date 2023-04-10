import { NgModule } from '@angular/core';
import {
  getRemoteConfig,
  provideRemoteConfig,
} from '@mandobridge/angularfire/remote-config';
import {
  getAnalytics,
  provideAnalytics,
} from '@mandobridge/angularfire/analytics';
import {
  getMessaging,
  provideMessaging,
} from '@mandobridge/angularfire/messaging';
import { getApp } from '@mandobridge/angularfire/app';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { provideAuth } from '@mandobridge/angularfire/auth';

import {
  initializeAuth,
  browserPopupRedirectResolver,
  indexedDBLocalPersistence,
} from '@mandobridge/angularfire/auth';
import { connectAuthEmulatorInDevMode } from './emulators';

@NgModule({
  imports: [
    AppModule,
    BrowserTransferStateModule,
    provideRemoteConfig(() => getRemoteConfig()),
    provideAnalytics(() => getAnalytics()),
    provideMessaging(() => getMessaging()),
    provideAuth(() => {
      const auth = initializeAuth(getApp(), {
        persistence: indexedDBLocalPersistence,
        popupRedirectResolver: browserPopupRedirectResolver,
      });
      connectAuthEmulatorInDevMode(auth);
      return auth;
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppBrowserModule {}
