(() => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDUMMY-REPLACE-WITH-YOUR-API-KEY',
    authDomain: 'digitalgrowthadvisor.firebaseapp.com',
    projectId: 'digitalgrowthadvisor',
    storageBucket: 'digitalgrowthadvisor.appspot.com',
    messagingSenderId: '000000000000',
    appId: '1:000000000000:web:0000000000000000000000'
  };

  try {
    if (!window.firebase) {
      console.warn('Firebase SDK is not loaded yet.');
      window.jhaTechFirebase = {
        getDb: () => null,
        getServerTimestamp: () => new Date()
      };
      return;
    }

    const app = window.firebase.apps?.length
      ? window.firebase.apps[0]
      : window.firebase.initializeApp(firebaseConfig);

    const db = window.firebase.firestore(app);

    window.jhaTechFirebase = {
      getDb: () => db,
      getServerTimestamp: () => window.firebase.firestore.FieldValue.serverTimestamp()
    };
  } catch (error) {
    console.error('Firebase initialization failed', error);
    window.jhaTechFirebase = {
      getDb: () => null,
      getServerTimestamp: () => new Date()
    };
  }
})();
