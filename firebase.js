(() => {
  const firebaseConfig = {
    apiKey: 'AIzaSyD5xHl0CYLutvpL8EFyRSICTwesXHycv_0',
    authDomain: 'jhatech-assessment.firebaseapp.com',
    projectId: 'jhatech-assessment',
    storageBucket: 'jhatech-assessment.firebasestorage.app',
    messagingSenderId: '695899245191',
    appId: '1:695899245191:web:2ed22a45cd5778361bc622',
    measurementId: 'G-J32YJJ27NK'
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
