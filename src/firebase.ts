import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD5xHl0CYLutvpL8EFyRSICTwesXHycv_0',
  authDomain: 'jhatech-assessment.firebaseapp.com',
  projectId: 'jhatech-assessment',
  storageBucket: 'jhatech-assessment.firebasestorage.app',
  messagingSenderId: '695899245191',
  appId: '1:695899245191:web:2ed22a45cd5778361bc622',
  measurementId: 'G-J32YJJ27NK',
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const db = getFirestore(app)
