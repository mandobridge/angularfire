import {
  NgModule,
  Optional,
  NgZone,
  InjectionToken,
  ModuleWithProviders,
  Injector,
} from '@angular/core';
import { Functions as FirebaseFunctions } from 'firebase/functions';
import {
  ɵgetDefaultInstanceOf,
  ɵAngularFireSchedulers,
  VERSION,
} from '@mandobridge/angularfire';
import {
  Functions,
  FunctionsInstances,
  FUNCTIONS_PROVIDER_NAME,
} from './functions';
import { FirebaseApps, FirebaseApp } from '@mandobridge/angularfire/app';
import { AuthInstances } from '@mandobridge/angularfire/auth';
import { registerVersion } from 'firebase/app';
import { AppCheckInstances } from '@mandobridge/angularfire/app-check';

export const PROVIDED_FUNCTIONS_INSTANCES = new InjectionToken<Functions[]>(
  'angularfire2.functions-instances'
);

export function defaultFunctionsInstanceFactory(
  provided: FirebaseFunctions[] | undefined,
  defaultApp: FirebaseApp
) {
  const defaultAuth = ɵgetDefaultInstanceOf<FirebaseFunctions>(
    FUNCTIONS_PROVIDER_NAME,
    provided,
    defaultApp
  );
  return defaultAuth && new Functions(defaultAuth);
}

export function functionsInstanceFactory(
  fn: (injector: Injector) => FirebaseFunctions
) {
  return (zone: NgZone, injector: Injector) => {
    const functions = zone.runOutsideAngular(() => fn(injector));
    return new Functions(functions);
  };
}

const FUNCTIONS_INSTANCES_PROVIDER = {
  provide: FunctionsInstances,
  deps: [[new Optional(), PROVIDED_FUNCTIONS_INSTANCES]],
};

const DEFAULT_FUNCTIONS_INSTANCE_PROVIDER = {
  provide: Functions,
  useFactory: defaultFunctionsInstanceFactory,
  deps: [[new Optional(), PROVIDED_FUNCTIONS_INSTANCES], FirebaseApp],
};

@NgModule({
  providers: [
    DEFAULT_FUNCTIONS_INSTANCE_PROVIDER,
    FUNCTIONS_INSTANCES_PROVIDER,
  ],
})
export class FunctionsModule {
  constructor() {
    registerVersion('angularfire', VERSION.full, 'fn');
  }
}

export function provideFunctions(
  fn: (injector: Injector) => FirebaseFunctions,
  ...deps: any[]
): ModuleWithProviders<FunctionsModule> {
  return {
    ngModule: FunctionsModule,
    providers: [
      {
        provide: PROVIDED_FUNCTIONS_INSTANCES,
        useFactory: functionsInstanceFactory(fn),
        multi: true,
        deps: [
          NgZone,
          Injector,
          ɵAngularFireSchedulers,
          FirebaseApps,
          // Defensively load Auth first, if provided
          [new Optional(), AuthInstances],
          [new Optional(), AppCheckInstances],
          ...deps,
        ],
      },
    ],
  };
}
