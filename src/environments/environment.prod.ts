export const environment = {
  production: true,
  API: import.meta.env.NG_APP_REST_API,
  SERVICE_TYPE: import.meta.env.NG_APP_SERVICE_TYPE,
  FIREBASE_CONFIG: {
    apiKey: import.meta.env.NG_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.NG_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.NG_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.NG_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.NG_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.NG_APP_FIREBASE_APP_ID
  }
};
