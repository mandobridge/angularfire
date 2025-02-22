import { BrowserModule } from '@angular/platform-browser';
import { isDevMode, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@mandobridge/angularfire/compat';

import {
  AngularFireAnalyticsModule,
  APP_NAME,
  APP_VERSION,
  DEBUG_MODE as ANALYTICS_DEBUG_MODE,
  ScreenTrackingService,
  UserTrackingService,
  COLLECTION_ENABLED,
} from '@mandobridge/angularfire/compat/analytics';

import { FirestoreComponent } from './firestore/firestore.component';
import {
  AngularFireDatabaseModule,
  USE_EMULATOR as USE_DATABASE_EMULATOR,
} from '@mandobridge/angularfire/compat/database';
import {
  AngularFirestoreModule,
  USE_EMULATOR as USE_FIRESTORE_EMULATOR,
  SETTINGS as FIRESTORE_SETTINGS,
} from '@mandobridge/angularfire/compat/firestore';
import {
  AngularFireStorageModule,
  USE_EMULATOR as USE_STORAGE_EMULATOR,
} from '@mandobridge/angularfire/compat/storage';
import {
  AngularFireAuthModule,
  USE_DEVICE_LANGUAGE,
  USE_EMULATOR as USE_AUTH_EMULATOR,
} from '@mandobridge/angularfire/compat/auth';
import {
  AngularFireMessagingModule,
  SERVICE_WORKER,
  VAPID_KEY,
} from '@mandobridge/angularfire/compat/messaging';
import {
  AngularFireFunctionsModule,
  USE_EMULATOR as USE_FUNCTIONS_EMULATOR,
} from '@mandobridge/angularfire/compat/functions';
import {
  AngularFireRemoteConfigModule,
  SETTINGS as REMOTE_CONFIG_SETTINGS,
  DEFAULTS as REMOTE_CONFIG_DEFAULTS,
} from '@mandobridge/angularfire/compat/remote-config';
import {
  AngularFirePerformanceModule,
  PerformanceMonitoringService,
} from '@mandobridge/angularfire/compat/performance';
import { AngularFireAuthGuardModule } from '@mandobridge/angularfire/compat/auth-guard';

import { DatabaseComponent } from './database/database.component';
import { StorageComponent } from './storage/storage.component';
import { RemoteConfigComponent } from './remote-config/remote-config.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { MessagingComponent } from './messaging/messaging.component';
import { FunctionsComponent } from './functions/functions.component';
import { UpboatsComponent } from './upboats/upboats.component';
import {
  initializeApp,
  provideFirebaseApp,
} from '@mandobridge/angularfire/app';

@NgModule({
  declarations: [
    AppComponent,
    StorageComponent,
    FirestoreComponent,
    DatabaseComponent,
    RemoteConfigComponent,
    HomeComponent,
    AuthComponent,
    MessagingComponent,
    FunctionsComponent,
    UpboatsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence({ synchronizeTabs: true }),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFireRemoteConfigModule,
    AngularFireMessagingModule,
    AngularFireAnalyticsModule,
    AngularFireFunctionsModule,
    AngularFirePerformanceModule,
    // provide modular style for AppCheck, see app.browser/server
    provideFirebaseApp(() => initializeApp(environment.firebase)),
  ],
  providers: [
    UserTrackingService,
    ScreenTrackingService,
    PerformanceMonitoringService,
    {
      provide: FIRESTORE_SETTINGS,
      useValue: { ignoreUndefinedProperties: true },
    },
    { provide: ANALYTICS_DEBUG_MODE, useValue: true },
    { provide: COLLECTION_ENABLED, useValue: true },
    {
      provide: USE_AUTH_EMULATOR,
      useValue: environment.useEmulators
        ? ['http://localhost:9099']
        : undefined,
    },
    {
      provide: USE_DATABASE_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 9000] : undefined,
    },
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 8080] : undefined,
    },
    {
      provide: USE_FUNCTIONS_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 5001] : undefined,
    },
    {
      provide: USE_STORAGE_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 9199] : undefined,
    },
    {
      provide: REMOTE_CONFIG_SETTINGS,
      useFactory: () =>
        isDevMode() ? { minimumFetchIntervalMillis: 10_000 } : {},
    },
    { provide: REMOTE_CONFIG_DEFAULTS, useValue: { background_color: 'red' } },
    { provide: USE_DEVICE_LANGUAGE, useValue: true },
    { provide: VAPID_KEY, useValue: environment.vapidKey },
    {
      provide: SERVICE_WORKER,
      useFactory: () =>
        (typeof navigator !== 'undefined' &&
          navigator.serviceWorker?.register('firebase-messaging-sw.js', {
            scope: '__',
          })) ||
        undefined,
    },
    { provide: APP_VERSION, useValue: '0.0.0' },
    { provide: APP_NAME, useValue: 'Angular' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
