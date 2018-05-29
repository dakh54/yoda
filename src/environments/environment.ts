// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCjrUHdKpk-cM4uUgteZzk3x4XEHLNc0L0",
    authDomain: "yoda-test-01.firebaseapp.com",
    databaseURL: "https://yoda-test-01.firebaseio.com",
    projectId: "yoda-test-01",
    storageBucket: "yoda-test-01.appspot.com",
    messagingSenderId: "40325241991"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
